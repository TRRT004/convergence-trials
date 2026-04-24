# Usage: cmake -P CopyCompileCommands.cmake <src_compile_commands> <dest_directory>
if(NOT ARGV)
    message(FATAL_ERROR "CopyCompileCommands.cmake requires two arguments: <src> <dest_dir>")
endif()
set(SRC "${ARGV0}")
set(DEST_DIR "${ARGV1}")

if(EXISTS "${SRC}")
    file(COPY "${SRC}" DESTINATION "${DEST_DIR}")
    message(STATUS "Copied ${SRC} to ${DEST_DIR}")
else()
    message(STATUS "No compile_commands.json at ${SRC}; skipping copy")
endif()
