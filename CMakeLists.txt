cmake_minimum_required(VERSION 3.24)

project(ConvergenceTrials
    VERSION 0.1.0
    DESCRIPTION "Convergence Trials desktop runtime"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

option(
    CONVERGENCE_TRIALS_ENABLE_RUNTIME
    "Build the runtime executable target (requires src/main.cpp and SFML 3.1)."
    OFF
)

if(CONVERGENCE_TRIALS_ENABLE_RUNTIME)
    if(NOT EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/src/main.cpp")
        message(FATAL_ERROR "CONVERGENCE_TRIALS_ENABLE_RUNTIME=ON requires src/main.cpp. Runtime implementation is not committed yet.")
    endif()

    if(DEFINED ENV{SFML_ROOT} AND NOT "$ENV{SFML_ROOT}" STREQUAL "")
        file(TO_CMAKE_PATH "$ENV{SFML_ROOT}" _convergence_trials_sfml_root)
        list(PREPEND CMAKE_PREFIX_PATH "${_convergence_trials_sfml_root}")
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
else()
    add_custom_target(convergence_trials_migration_status ALL
        COMMAND ${CMAKE_COMMAND} -E echo "Runtime implementation pending. Configure with -DCONVERGENCE_TRIALS_ENABLE_RUNTIME=ON once src/main.cpp exists."
        VERBATIM
    )
endif()
