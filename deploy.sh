#!/bin/bash

# Script de deployment pentru Selectrik
# Folosește: ./deploy.sh user@server.com

if [ $# -eq 0 ]; then
    echo "Folosește: ./deploy.sh user@server.com"
    exit 1
fi

SERVER=$1
APP_DIR="/var/www/selectrik"

echo "🚀 Deploying Selectrik to $SERVER..."

# 1. Build frontend
echo "📦 Building frontend..."
npm run build

# 2. Create directories on server
echo "📁 Creating directories on server..."
ssh $SERVER "sudo mkdir -p $APP_DIR/public $APP_DIR/server $APP_DIR/logs"

# 3. Copy frontend files
echo "📤 Copying frontend files..."
scp -r dist/* $SERVER:$APP_DIR/public/

# 3.1. Copy .htaccess file
echo "📤 Copying .htaccess file..."
scp public/.htaccess $SERVER:$APP_DIR/public/

# 4. Copy backend files
echo "📤 Copying backend files..."
scp -r server/* $SERVER:$APP_DIR/server/

# 5. Copy environment file
echo "⚙️ Setting up environment..."
scp deployment-config.env $SERVER:$APP_DIR/server/.env

# 6. Install dependencies and start server
echo "🔧 Installing dependencies and starting server..."
ssh $SERVER "cd $APP_DIR/server && npm install --production && pm2 start src/index.ts --name selectrik-backend --interpreter tsx"

echo "✅ Deployment complete!"
echo "🌐 Application should be available at: http://$SERVER:3001"
