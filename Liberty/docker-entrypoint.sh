#!/bin/bash

# We use this file to translate environmental variables to .env files used by the application

set -e


echo "
TZ=UTC
REACT_APP_API_HOST=$REACT_APP_API_HOST
REACT_APP_API_PROTOCOL=$REACT_APP_API_PROTOCOL
REACT_APP_API_PORT=$REACT_APP_API_PORT
REACT_APP_COMMIT_SHA=$REACT_APP_COMMIT_SHA

# To display liberty version
REACT_APP_COMMIT_SHA=$REACT_APP_COMMIT_SHA

# Set max transferable file size in MB
REACT_APP_MAX_FILE_SIZE=$REACT_APP_MAX_FILE_SIZE
" > client/.env


echo"
MAILGUN_API_KEY=$MAILGUN_API_KEY
MAILGUN_DOMAIN=$MAILGUN_DOMAIN
ABUSE_TO_EMAIL_ADDRESS=$ABUSE_TO_EMAIL_ADDRESS
ABUSE_FROM_EMAIL_ADDRESS=$ABUSE_FROM_EMAIL_ADDRESS

CLIENT_DIST_DIRECTORY='client/dist/path'

ROOM_HASH_SECRET=$ROOM_HASH_SECRET

SITE_URL=$SITE_URL

# Store configuration
STORE_BACKEND=$STORE_BACKEND
STORE_HOST=$STORE_HOST
" > server/.env

exec "$@"