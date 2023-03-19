#!/bin/bash
npm run build
echo "Removing mocks directories"
find ./build -type d -name "mocks" | xargs -I % sh -c 'echo %; rm -rf %;'
echo "Removing __tests__ directories"
find ./build -type d -name "__tests__" | xargs -I % sh -c 'echo %; rm -rf %;'
echo "Removing src directory"
mv ./build/src/* ./build/; rm -rf ./build/src;
