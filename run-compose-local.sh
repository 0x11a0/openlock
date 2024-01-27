#!/bin/bash

# Make sure to give execute permissions to this script with:
# chmod +x run-compose-local.sh

# Check if the docker-compose-staging.yml file exists
if [ -f "compose-local.yml" ]; then
    # Pull the latest images
    docker-compose -f compose-local.yml pull

    # Build the project
    docker-compose -f compose-local.yml build

    # Run docker-compose up in detached mode
    docker-compose -f compose-local.yml up -d

    echo "Docker Compose for local environment is up and running."
else
    echo "Error: compose-local.yml does not exist."
    exit 1
fi
