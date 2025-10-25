# 🚀 CloudLinux NodeJS Selector Deployment

## 📁 **Correct Directory Structure for CloudLinux:**

```
/home/selectri/
├── public_html/                          # Frontend files
│   ├── index.html
│   ├── assets/
│   └── ...
└── selectrik/
    └── server/                           # Backend files (Application root)
        ├── src/
        │   ├── index.ts
        │   └── db/
        │       └── database.ts           # Uses ../../database.db
        ├── package.json
        ├── tsconfig.json
        ├── start.sh                      # ← Application startup file
        ├── .env
        └── database.db                   # ← SQLite database (auto-created)
```

## ⚙️ **CloudLinux NodeJS Selector Configuration:**

### **Application Settings:**
- **Node.js version:** `18.x` or `20.x`
- **Application mode:** `Production`
- **NODE_ENV:** `production`
- **Application root:** `/home/selectri/selectrik/server`
- **Application URL:** `https://yourdomain.com`
- **Application startup file:** `start.sh`

### **Environment Variables (.env):**
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
# Database path is auto-calculated: /home/selectri/selectrik/server/database.db
# No need to set DATABASE_PATH in .env (uses default from code)
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_EMAIL=admin@selectrik.ro
ADMIN_PASSWORD=Admin123!
```

## 🚀 **Deployment Steps:**

### **1. Use the CloudLinux deployment script:**
```bash
./cloudlinux-deploy.sh user@your-server.com
```

### **2. Manual deployment:**
```bash
# Create directories
ssh user@server "mkdir -p /home/selectri/public_html"

# IMPORTANT: Remove node_modules if exists (CloudLinux requirement)
ssh user@server "rm -rf /home/selectri/selectrik/server/node_modules"

# Copy frontend
scp -r dist/* user@server:/home/selectri/public_html/

# Copy backend (NO node_modules)
scp -r server/src user@server:/home/selectri/selectrik/server/
scp server/package.json user@server:/home/selectri/selectrik/server/
scp server/tsconfig.json user@server:/home/selectri/selectrik/server/
scp server/start.sh user@server:/home/selectri/selectrik/server/
scp deployment-config.env user@server:/home/selectri/selectrik/server/.env

# Set permissions
ssh user@server "chmod +x /home/selectri/selectrik/server/start.sh"

# Verify no node_modules exists
ssh user@server "ls -la /home/selectri/selectrik/server/ | grep node_modules || echo 'OK: No node_modules found'"
```

## 🔧 **Key Points for CloudLinux:**

1. ⚠️ **CRITICAL: NO `node_modules` folder** in your application root - CloudLinux will FAIL if it exists
2. **CloudLinux manages dependencies** automatically in a virtual environment
3. **Use `start.sh`** as the startup file
4. **Frontend and backend** in separate folders
5. **Backend serves frontend** from the correct path

## ⚠️ **IMPORTANT: Before saving in CloudLinux NodeJS Selector:**

```bash
# Always remove node_modules first!
ssh user@server "rm -rf /home/selectri/selectrik/server/node_modules"
```

If you see error: "application should not contain folder/file with such name in application root"
→ You forgot to delete `node_modules`!

## 📋 **What CloudLinux will do automatically:**

- Install `node_modules` in a virtual environment
- Create symlinks to `node_modules`
- Run `npm install --production`
- Execute your `start.sh` script
- Manage the Node.js process

## 🎯 **Result:**

Your application will be available at your domain, with:
- Frontend served from `/home/selectri/public_html/`
- Backend API on the same domain
- Database at `/home/selectri/selectrik/server/database.db`
- Automatic dependency management by CloudLinux
- No `node_modules` conflicts
