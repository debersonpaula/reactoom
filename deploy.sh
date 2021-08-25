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

echo "Copying files..."
cp "./package.json" "./bin/package.json"

echo "Deploy Next"
cd bin
npm publish --tag next
