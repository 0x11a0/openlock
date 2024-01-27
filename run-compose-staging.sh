#!/bin/bash

# Make sure to give execute permissions to this script with:
# chmod +x run-compose-staging.sh

# Check if the docker-compose-staging.yml file exists
if [ -f "compose-staging.yml" ]; then
    # Pull the latest images
    docker-compose -f compose-staging.yml pull

    # Build the project
    docker-compose -f compose-staging.yml build

    # Run docker-compose up in detached mode
    docker-compose -f compose-staging.yml up -d

    echo "Docker Compose for staging environment is up and running."
else
    echo "Error: compose-staging.yml does not exist."
    exit 1
fi
