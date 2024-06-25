#!/usr/bin/with-contenv bashio

# Source the s6-overlay helper to manage environment variables
# source /usr/sbin/s6-env

# Load the configuration values using bashio
CONFIG_PATH=/data/options.json
MY_PASSWORD=$(bashio::config 'my_password')
APP_ENV="production"
# Export the environment variables
export MY_PASSWORD
export APP_ENV

# Start your Python application
python ./main.py