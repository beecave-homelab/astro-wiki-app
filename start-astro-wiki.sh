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
SERVICE_NAME="astro-wiki"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

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
  -l, --log FILE         Specify the log file location (default: $LOG_FILE)
  -s, --setup            Setup systemd service for automatic startup
  -h, --help             Show this help message

Examples:
  $0 
  $0 -d /opt/astro-wiki-app -l /var/log/custom-wiki.log
  $0 --setup
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

  # Check dependencies
  if ! command -v npm &> /dev/null; then
    error_exit "npm is not installed"
  fi

  if ! command -v node &> /dev/null; then
    error_exit "node is not installed"
  fi

  log_message "Starting Astro Wiki App..." "$log_file"
  log_message "Waiting $DELAY_SECONDS seconds for system initialization..." "$log_file"
  sleep "$DELAY_SECONDS"

  if [[ ! -d "$app_dir" ]]; then
    error_exit "Application directory not found: $app_dir"
  fi

  cd "$app_dir" || error_exit "Failed to change to application directory"

  if [[ ! -f "package.json" ]]; then
    error_exit "package.json not found in $app_dir"
  fi

  log_message "Starting application..." "$log_file"
  npm run build >> "$log_file" 2>&1 || error_exit "Build failed"
  npm run start >> "$log_file" 2>&1 &

  log_message "Astro Wiki App started successfully" "$log_file"
}

# Function to setup systemd service
setup_service() {
  local app_dir="$1"
  
  if [[ $EUID -ne 0 ]]; then
    error_exit "Setup requires root privileges. Please run with sudo."
  fi

  cat > "$SERVICE_FILE" << EOL
[Unit]
Description=Astro Wiki App
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=$SUDO_USER
Environment=NODE_ENV=production
ExecStartPre=/bin/sleep $DELAY_SECONDS
ExecStart=$(which bash) $app_dir/start-astro-wiki.sh
Restart=always
RestartSec=10
WorkingDirectory=$app_dir
StandardOutput=append:${LOG_FILE}
StandardError=append:${LOG_FILE}

# Security settings
ProtectSystem=full
ProtectHome=read-only
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOL

  systemctl daemon-reload
  systemctl enable "$SERVICE_NAME"
  systemctl start "$SERVICE_NAME"
  
  echo "Systemd service installed and started successfully"
  echo "Check status with: systemctl status $SERVICE_NAME"
}

# Main function
main() {
  local app_directory="$APP_DIR"
  local log_file="$LOG_FILE"
  local setup_mode=false

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
      -s|--setup)
        setup_mode=true
        shift
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

  if [[ "$setup_mode" == true ]]; then
    setup_service "$app_directory"
    exit 0
  fi

  # Create log directory if it doesn't exist
  mkdir -p "$(dirname "$log_file")" || error_exit "Failed to create log directory"

  # Call the main logic function
  main_logic "$app_directory" "$log_file"
}

# Print ASCII Art
print_ascii_art

# Execute the main function
main "$@" 