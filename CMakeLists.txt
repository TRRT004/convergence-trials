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
