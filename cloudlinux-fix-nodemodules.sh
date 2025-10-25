#!/bin/bash

# Quick fix script for CloudLinux node_modules error
# Run this if you get: "application should not contain folder/file with such name in application root"

if [ $# -eq 0 ]; then
    echo "Usage: ./cloudlinux-fix-nodemodules.sh user@server.com"
    exit 1
fi

SERVER=$1
APP_DIR="/home/selectri"

echo "🧹 Removing node_modules from CloudLinux application root..."
ssh $SERVER "rm -rf $APP_DIR/selectrik/server/node_modules"

echo "✅ Checking if node_modules is removed..."
ssh $SERVER "if [ -d $APP_DIR/selectrik/server/node_modules ]; then echo '❌ ERROR: node_modules still exists!'; exit 1; else echo '✓ SUCCESS: node_modules removed'; fi"

echo ""
echo "📋 Now you can:"
echo "   1. Go to CloudLinux NodeJS Selector in cPanel"
echo "   2. Try to save/create your application again"
echo "   3. CloudLinux will create node_modules automatically in virtual environment"

