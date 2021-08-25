#!/bin/bash

./build.sh

echo "Deploy Next"
cd bin
npm publish --tag next
