#!/bin/bash

function runCommand {
    cmd=$1
    $cmd
    status=$?
    if [ ! $status -eq 0 ]; then
        exit 1
    fi
}

echo "Clearing bin folder..."
rm -rf ./bin

echo "Transpile files..."
runCommand "./node_modules/.bin/tsc --project tsconfig.types.json"

echo "Copying final files..."
runCommand "cp -a ./readme.md ./bin/"
runCommand "cp -a ./package.json ./bin/"

