#!/bin/bash

# CloudLinux NodeJS Selector Deployment Script
# This script creates the correct structure for CloudLinux

if [ $# -eq 0 ]; then
    echo "Usage: ./cloudlinux-deploy.sh user@server.com"
    exit 1
fi

SERVER=$1
APP_DIR="/home/selectrik"  # CloudLinux user directory

echo "🚀 Deploying to CloudLinux NodeJS Selector..."

# 1. Build frontend
echo "📦 Building frontend..."
npm run build

# 2. Create directory structure on server
echo "📁 Creating CloudLinux directory structure..."
ssh $SERVER "mkdir -p $APP_DIR/{server,public}"

# 3. Copy frontend files to public directory
echo "📤 Copying frontend files..."
scp -r dist/* $SERVER:$APP_DIR/public/

# 4. Copy backend source files (NO node_modules)
echo "📤 Copying backend source files..."
scp -r server/src $SERVER:$APP_DIR/server/
scp server/package.json $SERVER:$APP_DIR/server/
scp server/tsconfig.json $SERVER:$APP_DIR/server/

# 5. Copy environment file
echo "⚙️ Setting up environment..."
scp deployment-config.env $SERVER:$APP_DIR/server/.env

# 6. Create startup script for CloudLinux
echo "📝 Creating CloudLinux startup script..."
cat > start.sh << 'EOF'
#!/bin/bash
cd /home/selectrik/server
npm install --production
tsx src/index.ts
EOF

scp start.sh $SERVER:$APP_DIR/
ssh $SERVER "chmod +x $APP_DIR/start.sh"

echo "✅ CloudLinux deployment complete!"
echo "🌐 Application structure:"
echo "   - Frontend: $APP_DIR/public/"
echo "   - Backend: $APP_DIR/server/"
echo "   - Startup: $APP_DIR/start.sh"
echo ""
echo "📋 Next steps on CloudLinux:"
echo "1. Set Application startup file to: start.sh"
echo "2. Set Application root to: $APP_DIR"
echo "3. The hosting provider will handle node_modules automatically"
