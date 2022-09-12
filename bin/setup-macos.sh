#!/usr/bin/env bash
#
# Setup Script
#
# Runs all the needed commands to set up a developer's system to run this app.
# Customize this as your app grows.

# Check for macOS
if [[ ! "$OSTYPE" =~ ^darwin ]]; then
  echo "This script only works on macOS"
  exit 1
fi

echo "----------------------------------------------------------"
echo "Installing system dependencies"
echo "----------------------------------------------------------"

# Check for Homebrew
command -v brew >/dev/null 2>&1 || {
  echo "This setup script requires Homebrew, but it was not found on your system."
  echo "Installing it from https://brew.sh/"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
}
echo "$(brew -v)"

# Ensure Node.js is installed
command -v npm >/dev/null 2>&1 || {
  echo "This app requires Node.js to run, but it was not found on your system."
  echo "Installing node with brew..."
  brew install node@16
}
echo "Node.js $(node -v)"

# Ensure Yarn is installed
command -v yarn >/dev/null 2>&1 || {
  echo "This app requires Yarn package manager, but it was not found on your system."
  echo "Installing yarn with brew..."
  brew install yarn
}
echo "Yarn $(yarn -v)"

echo "----------------------------------------------------------"
echo "Installing NPM Packages with Yarn"
echo "----------------------------------------------------------"

yarn || { echo "NPM Packages could not be installed!"; exit 1; };

echo "----------------------------------------------------------"
echo "Setting up the environment variables"
echo "----------------------------------------------------------"

cp .example.env .env || { echo "Environment variables could not be setup!"; exit 1; };
cat .env && echo

echo "----------------------------------------------------------"
echo "Running tests to verify setup is complete"
echo "----------------------------------------------------------"

yarn test || { exit 1; }

echo "----------------------------------------------------------"
echo "Setup complete!"
echo "----------------------------------------------------------"

echo "To run the service:"
echo "yarn api:start"