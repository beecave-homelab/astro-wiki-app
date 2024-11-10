#!/bin/bash
set -euo pipefail

# Script Description: Starts the Astro Wiki App after system boot with a safety delay
# Author: System Administrator
# Version: 0.1.0
# License: MIT
# Creation Date: 2024
# Usage: ./start-astro-wiki.sh [OPTIONS]

# Constants
APP_DIR="${PWD}"
LOG_FILE="${PWD}/log/astro-wiki.log"
DELAY_SECONDS=20

# ASCII Art
print_ascii_art() {
  echo "
    █████╗ ███████╗████████╗██████╗  ██████╗     ██╗    ██╗██╗██╗  ██╗██╗
   ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ██║    ██║██║██║ ██╔╝██║
   ███████║███████╗   ██║   ██████╔╝██║   ██║    ██║ █╗ ██║██║█████╔╝ ██║
   ██╔══██║╚════██║   ██║   ██╔══██╗██║   ██║    ██║███╗██║██║██╔═██╗ ██║
   ██║  ██║███████║   ██║   ██║  ██║╚██████╔╝    ╚███╔███╔╝██║██║  ██╗██║
   ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝      ╚══╝╚══╝ ╚═╝╚═╝  ╚═╝╚═╝
  "
}

# Function to display help
show_help() {
  echo "
Usage: $0 [OPTIONS]

Options:
  -d, --directory DIR    Specify the Astro Wiki App directory (default: $APP_DIR)
  -l, --log FILE        Specify the log file location (default: $LOG_FILE)
  -h, --help           Show this help message

Examples:
  $0 
  $0 -d /opt/astro-wiki-app -l /var/log/custom-wiki.log
"
}

# Function for error handling
error_exit() {
  echo "Error: $1" >&2
  exit 1
}

# Function for main logic
main_logic() {
  local app_dir="$1"
  local log_file="$2"

  echo "Starting Astro Wiki App..."
  echo "Waiting $DELAY_SECONDS seconds for system initialization..."
  sleep "$DELAY_SECONDS"

  if [[ ! -d "$app_dir" ]]; then
    error_exit "Application directory not found: $app_dir"
  }

  cd "$app_dir" || error_exit "Failed to change to application directory"

  if [[ ! -f "package.json" ]]; then
    error_exit "package.json not found in $app_dir"
  }

  echo "Starting application..." >> "$log_file"
  npm run build >> "$log_file" 2>&1 || error_exit "Build failed"
  npm run start >> "$log_file" 2>&1 &

  echo "Astro Wiki App started successfully. Check $log_file for details."
}

# Main function
main() {
  local app_directory="$APP_DIR"
  local log_file="$LOG_FILE"

  # Parse command-line options
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -d|--directory)
        app_directory="$2"
        shift 2
        ;;
      -l|--log)
        log_file="$2"
        shift 2
        ;;
      -h|--help)
        show_help
        exit 0
        ;;
      *)
        error_exit "Invalid option: $1"
        ;;
    esac
  done

  # Create log directory if it doesn't exist
  mkdir -p "$(dirname "$log_file")" || error_exit "Failed to create log directory"

  # Call the main logic function
  main_logic "$app_directory" "$log_file"
}

# Print ASCII Art
print_ascii_art

# Execute the main function
main "$@" 