[CmdletBinding()]
param(
    [ValidateSet("dev", "release", "runtime-debug")]
    [string]$Target = "runtime-debug",
    [string]$SFMLDir = $env:SFML_DIR,
    [string]$SFMLBinDir = $env:SFML_BIN_DIR,
    [switch]$NoRun
)

$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptRoot "..")

function Resolve-SfmlCMakeDir {
    param([string]$InputPath)

    if ([string]::IsNullOrWhiteSpace($InputPath)) {
        return $null
    }

    $resolvedInput = Resolve-Path -LiteralPath $InputPath -ErrorAction SilentlyContinue
    if (-not $resolvedInput) {
        return $null
    }

    $inputDir = $resolvedInput.Path
    $parentDir = Split-Path $inputDir -Parent

    $candidates = @(
        $inputDir,
        (Join-Path $inputDir "lib\\cmake\\SFML"),
        (Join-Path $parentDir "lib\\cmake\\SFML")
    )

    foreach ($candidate in ($candidates | Select-Object -Unique)) {
        if ([string]::IsNullOrWhiteSpace($candidate)) {
            continue
        }

        if (Test-Path (Join-Path $candidate "SFMLConfig.cmake")) {
            return (Resolve-Path -LiteralPath $candidate).Path
        }
    }

    return $null
}

function Resolve-SfmlBinDir {
    param(
        [string]$InputPath,
        [string]$CMakeDir
    )

    $candidates = @()

    if (-not [string]::IsNullOrWhiteSpace($InputPath)) {
        $resolvedInput = Resolve-Path -LiteralPath $InputPath -ErrorAction SilentlyContinue
        if ($resolvedInput) {
            $inputDir = $resolvedInput.Path
            $candidates += $inputDir
            $candidates += (Join-Path $inputDir "bin")
            $candidates += (Join-Path (Split-Path $inputDir -Parent) "bin")
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($CMakeDir)) {
        $sfmlRoot = Resolve-Path -LiteralPath (Join-Path $CMakeDir "..\\..\\..") -ErrorAction SilentlyContinue
        if ($sfmlRoot) {
            $candidates += (Join-Path $sfmlRoot.Path "bin")
        }
    }

    foreach ($candidate in ($candidates | Select-Object -Unique)) {
        if ([string]::IsNullOrWhiteSpace($candidate)) {
            continue
        }

        $leaf = Split-Path $candidate -Leaf
        if ($leaf -ieq "bin" -and (Test-Path -LiteralPath $candidate)) {
            return (Resolve-Path -LiteralPath $candidate).Path
        }
    }

    return $null
}

$presetName = switch ($Target) {
    "dev" { "dev" }
    "release" { "runtime-release" }
    "runtime-debug" { "runtime-debug" }
}

$buildConfig = switch ($Target) {
    "release" { "Release" }
    default { "Debug" }
}

$buildSubdir = switch ($Target) {
    "dev" { "dev" }
    "release" { "runtime-release" }
    "runtime-debug" { "runtime-debug" }
}

$isRuntimeTarget = $Target -ne "dev"
$resolvedSFMLDir = $null
$resolvedSFMLBinDir = $null

if ($isRuntimeTarget -and [string]::IsNullOrWhiteSpace($SFMLDir)) {
    $defaultSFMLDir = "C:/Libraries/SFML-3.1.0/lib/cmake/SFML"
    if (Test-Path $defaultSFMLDir) {
        $SFMLDir = $defaultSFMLDir
    }
}

if ($isRuntimeTarget) {
    $resolvedSFMLDir = Resolve-SfmlCMakeDir -InputPath $SFMLDir
    if (-not $resolvedSFMLDir) {
        throw "SFML is not configured. Pass -SFMLDir (root, bin, or lib/cmake/SFML) or set the SFML_DIR environment variable."
    }

    $resolvedSFMLBinDir = Resolve-SfmlBinDir -InputPath $SFMLBinDir -CMakeDir $resolvedSFMLDir
}

Push-Location $projectRoot
try {
    $configureArgs = @("--preset", $presetName)
    if ($isRuntimeTarget) {
        $normalizedSFMLDir = ($resolvedSFMLDir -replace "\\", "/")
        $configureArgs += "-DSFML_DIR=$normalizedSFMLDir"
    }

    Write-Host "Configuring preset '$presetName'..."
    & cmake @configureArgs
    if ($LASTEXITCODE -ne 0) {
        throw "CMake configure failed."
    }

    $buildArgs = @("--build", "--preset", $presetName, "--config", $buildConfig)
    Write-Host "Building preset '$presetName' ($buildConfig)..."
    & cmake @buildArgs
    if ($LASTEXITCODE -ne 0) {
        throw "CMake build failed."
    }

    if ($NoRun) {
        Write-Host "Build complete; run step skipped due to -NoRun."
        return
    }

    if (-not $isRuntimeTarget) {
        Write-Host "Target 'dev' is scaffold-only and does not produce an executable to run."
        return
    }

    $buildRoot = Join-Path $projectRoot "build"
    $buildDir = Join-Path $buildRoot $buildSubdir
    $candidatePaths = @(
        (Join-Path $buildDir "$buildConfig/convergence_trials.exe"),
        (Join-Path $buildDir "convergence_trials.exe")
    )

    $executablePath = $candidatePaths | Where-Object { Test-Path $_ } | Select-Object -First 1
    if (-not $executablePath) {
        $executablePath = Get-ChildItem -Path $buildDir -Recurse -Filter "convergence_trials.exe" -ErrorAction SilentlyContinue |
            Select-Object -ExpandProperty FullName -First 1
    }

    if (-not $executablePath) {
        throw "Build succeeded but convergence_trials.exe was not found under '$buildDir'."
    }

    $originalPath = $env:PATH
    if ($resolvedSFMLBinDir) {
        $pathParts = $env:PATH -split ";"
        if (-not ($pathParts -contains $resolvedSFMLBinDir)) {
            $env:PATH = "$resolvedSFMLBinDir;$env:PATH"
        }
    }

    Write-Host "Launching $executablePath"
    try {
        & $executablePath
        if ($LASTEXITCODE -ne 0) {
            if ($LASTEXITCODE -eq -1073741511 -or $LASTEXITCODE -eq -1073741515) {
                throw "Game exited with code $LASTEXITCODE. This often means SFML runtime/toolchain mismatch. For Visual Studio presets, use an MSVC-built SFML package or install via vcpkg (sfml:x64-windows)."
            }
            throw "Game exited with code $LASTEXITCODE."
        }
    }
    finally {
        $env:PATH = $originalPath
    }
}
finally {
    Pop-Location
}