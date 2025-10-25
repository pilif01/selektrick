#!/bin/bash

# Script to install dependencies on server
# Run this ON THE SERVER after copying files

echo "🔧 Installing Node.js dependencies on server..."

# Navigate to server directory
cd /var/www/selectrik/server

# Install only production dependencies
npm install --production

# Install tsx globally for TypeScript execution
npm install -g tsx

# Create logs directory
mkdir -p /var/www/selectrik/logs

# Set proper permissions
chown -R $USER:$USER /var/www/selectrik
chmod +x /var/www/selectrik/server/src/index.ts

echo "✅ Dependencies installed successfully!"
echo "🚀 You can now start the server with: pm2 start ecosystem.config.js"
