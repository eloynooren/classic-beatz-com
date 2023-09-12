#!/bin/bash

# Check if a file is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <JSON File>"
    exit 1
fi

# The input JSON file
JSON_FILE="$1"

# Validate JSON
if ! jq empty "$JSON_FILE" >/dev/null 2>&1; then
    echo "Invalid JSON file!"
    exit 1
fi

# Loop through the keys in the dictionary under the "annotations.COMPOSER" key
for K in $(jq -r '.annotations.COMPOSER | keys[]' "$JSON_FILE"); do

    # Extract the corresponding value for each key (assumed to be an array)
    V=$(jq -c --arg K "$K" '.annotations.COMPOSER[$K]' "$JSON_FILE")

    # Create a temporary JSON object
    JSON_CONTENT=$(echo "{ \"composer\": \"$K\", \"annotations\": $V }")

    # Create the new JSON file with the name in lowercase
    echo $JSON_CONTENT | jq '.' > "$(echo $K | tr 'A-Z' 'a-z').json"

    # Output message
    echo "File $(echo $K | tr 'A-Z' 'a-z').json has been created."
done

