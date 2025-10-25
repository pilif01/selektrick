#!/bin/bash
cd /home/selectri/selectrik/server
mkdir -p logs

# Install all dependencies (including dev for build)
npm install

# Build TypeScript to JavaScript
npm run build

# Run the compiled JavaScript
node dist/index.js
