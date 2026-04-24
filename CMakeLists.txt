cmake_minimum_required(VERSION 3.24)

project(ConvergenceTrials
    VERSION 0.1.0
    DESCRIPTION "Convergence Trials desktop runtime"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Export compilation database for clangd/clang tools
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# --- clang-format / clang-tidy integration ---------------------------------
find_program(CLANG_FORMAT_EXE NAMES clang-format clang-format-15 clang-format-14)
find_program(CLANG_TIDY_EXE NAMES clang-tidy clang-tidy-15 clang-tidy-14)

if(CLANG_FORMAT_EXE)
    file(GLOB_RECURSE ALL_SOURCE_FILES
        "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp"
        "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cxx"
        "${CMAKE_CURRENT_SOURCE_DIR}/include/*.h"
        "${CMAKE_CURRENT_SOURCE_DIR}/include/*.hpp"
    )

    add_custom_target(clang_format
        COMMAND ${CLANG_FORMAT_EXE} -i ${ALL_SOURCE_FILES}
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        COMMENT "Running clang-format on project sources"
    )
endif()

if(CLANG_TIDY_EXE)
    set(CMAKE_CXX_CLANG_TIDY "${CLANG_TIDY_EXE}" CACHE STRING "Path to clang-tidy executable")
endif()

if(CMAKE_EXPORT_COMPILE_COMMANDS)
    if(EXISTS "${CMAKE_BINARY_DIR}/compile_commands.json")
        add_custom_target(copy_compile_commands ALL
            COMMAND ${CMAKE_COMMAND} -E copy_if_different
                "${CMAKE_BINARY_DIR}/compile_commands.json"
                "${CMAKE_SOURCE_DIR}/compile_commands.json"
            COMMENT "Copy compile_commands.json to project root for clangd"
        )
    else()
        add_custom_target(copy_compile_commands ALL
            COMMAND ${CMAKE_COMMAND} -E echo "No compile_commands.json found; skipping copy"
            COMMENT "No compile_commands.json to copy"
        )
    endif()
endif()


option(
    CONVERGENCE_TRIALS_ENABLE_RUNTIME
    "Build the runtime executable target (requires src/main.cpp and SFML 3.1)."
    OFF
)

if(CONVERGENCE_TRIALS_ENABLE_RUNTIME)
    if(NOT EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/src/main.cpp")
        message(FATAL_ERROR "CONVERGENCE_TRIALS_ENABLE_RUNTIME=ON requires src/main.cpp. Runtime implementation is not committed yet.")
    endif()

    find_package(SFML 3.1 REQUIRED COMPONENTS System Window Graphics)

    add_executable(convergence_trials
        src/main.cpp
    )

    target_include_directories(convergence_trials
        PRIVATE
            "${CMAKE_CURRENT_SOURCE_DIR}/include"
    )

    target_compile_features(convergence_trials PRIVATE cxx_std_20)

    target_link_libraries(convergence_trials
        PRIVATE
            SFML::System
            SFML::Window
            SFML::Graphics
    )

    if(WIN32)
        add_custom_command(TARGET convergence_trials POST_BUILD
            COMMAND ${CMAKE_COMMAND} -E copy_if_different
                $<TARGET_RUNTIME_DLLS:convergence_trials>
                $<TARGET_FILE_DIR:convergence_trials>
            COMMAND_EXPAND_LISTS
        )
    endif()
else()
    add_custom_target(convergence_trials_migration_status ALL
        COMMAND ${CMAKE_COMMAND} -E echo "Runtime implementation pending. Configure with -DCONVERGENCE_TRIALS_ENABLE_RUNTIME=ON once src/main.cpp exists."
        VERBATIM
    )
endif()
