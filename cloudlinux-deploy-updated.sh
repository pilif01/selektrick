#!/bin/bash

# CloudLinux NodeJS Selector Deployment Script
# Updated for your actual directory structure

if [ $# -eq 0 ]; then
    echo "Usage: ./cloudlinux-deploy-updated.sh user@server.com"
    exit 1
fi

SERVER=$1
APP_DIR="/home/selectri"  # Your actual directory

echo "🚀 Deploying to CloudLinux NodeJS Selector..."

# 1. Build frontend
echo "📦 Building frontend..."
npm run build

# 2. Create directory structure (if needed)
echo "📁 Ensuring directory structure exists..."
ssh $SERVER "mkdir -p $APP_DIR/public_html"

# 3. Copy frontend files to public_html
echo "📤 Copying frontend files to public_html..."
scp -r dist/* $SERVER:$APP_DIR/public_html/

# 4. Remove node_modules if exists (CloudLinux requirement)
echo "🧹 Cleaning old node_modules (CloudLinux requirement)..."
ssh $SERVER "rm -rf $APP_DIR/selectrik/server/node_modules"

# 5. Copy backend source files to selectrik/server folder
echo "📤 Copying backend source files to selectrik/server folder..."
scp -r server/src $SERVER:$APP_DIR/selectrik/server/
scp server/package.json $SERVER:$APP_DIR/selectrik/server/
scp server/tsconfig.json $SERVER:$APP_DIR/selectrik/server/
scp server/start.sh $SERVER:$APP_DIR/selectrik/server/

# 6. Copy environment file
echo "⚙️ Setting up environment..."
scp deployment-config.env $SERVER:$APP_DIR/selectrik/server/.env

# 7. Make startup script executable
echo "🔧 Setting permissions..."
ssh $SERVER "chmod +x $APP_DIR/selectrik/server/start.sh"

# 8. Verify no node_modules exists
echo "✅ Verifying node_modules is removed..."
ssh $SERVER "if [ -d $APP_DIR/selectrik/server/node_modules ]; then echo '⚠️  WARNING: node_modules still exists! CloudLinux will fail.'; else echo '✓ node_modules removed - ready for CloudLinux'; fi"

echo "✅ CloudLinux deployment complete!"
echo "🌐 Application structure:"
echo "   - Frontend: $APP_DIR/public_html/"
echo "   - Backend: $APP_DIR/selectrik/server/"
echo "   - Startup: $APP_DIR/selectrik/server/start.sh"
echo "   - Database: $APP_DIR/selectrik/server/database.db (auto-created)"
echo ""
echo "📋 CloudLinux NodeJS Selector Configuration:"
echo "   - Application root: $APP_DIR/selectrik/server"
echo "   - Application startup file: start.sh"
echo "   - Node.js version: 18.x or 20.x"
echo "   - Application mode: Production"
