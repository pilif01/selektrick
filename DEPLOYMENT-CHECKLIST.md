# ✅ Deployment Checklist - CloudLinux NodeJS Selector

## 📋 **Pre-Deployment Verification:**

### **1. Build Status:**
- [x] Frontend build completat (`npm run build`)
- [x] Directorul `dist/` generat cu succes
- [x] Toate fișierele TypeScript compilate fără erori

### **2. Structura Fișierelor:**

```
/Users/filipbulc/Documents/Selectrik/
├── dist/                          # Frontend build (gata de deployment)
├── server/
│   ├── src/
│   │   └── index.ts              # ✅ Servește din ../../public_html
│   ├── package.json              # ✅ Backend dependencies
│   ├── tsconfig.json             # ✅ TypeScript config
│   └── start.sh                  # ✅ CloudLinux startup script
├── deployment-config.env          # ✅ Template pentru .env
└── cloudlinux-deploy-updated.sh   # ✅ Deployment script
```

### **3. Configurare Backend (`server/src/index.ts`):**
- [x] **Linia 48:** `app.use(express.static(path.join(__dirname, '../../public_html')));`
  - ✅ Servește fișierele statice din `public_html`
- [x] **Linia 58:** `res.sendFile(path.join(__dirname, '../../public_html/index.html'));`
  - ✅ React Router fallback corect
- [x] **Linia 22-28:** CORS configurat pentru multiple porturi
  - ✅ Include `process.env.FRONTEND_URL`

### **4. CloudLinux Startup Script (`server/start.sh`):**
```bash
#!/bin/bash
cd /home/selectrik/server
npm install --production
tsx src/index.ts
```
- [x] Path corect: `/home/selectrik/server`
- [x] Instalează dependencies automat
- [x] Rulează `tsx src/index.ts`

### **5. Environment Variables (`deployment-config.env`):**
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://selectrik.ro
DATABASE_PATH=/home/selectrik/server/database.db
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
ADMIN_EMAIL=admin@selectrik.ro
ADMIN_PASSWORD=Admin123!
```
- [x] Path-uri corecte cu `selectrik` (nu `selectri`)
- [x] Database path: `/home/selectrik/server/database.db`
- [x] Frontend URL configurat

### **6. Deployment Script (`cloudlinux-deploy-updated.sh`):**
- [x] APP_DIR corect: `/home/selectrik`
- [x] Copiază frontend în `public_html/`
- [x] Copiază backend în `server/`
- [x] Setează permisiuni pentru `start.sh`

## 🚀 **CloudLinux NodeJS Selector Configuration:**

### **Settings (în cPanel):**
```
Application root:           /home/selectri/selectrik/server
Application startup file:   start.sh
Node.js version:            18.x sau 20.x
Application mode:           Production
Application URL:            https://selectrik.ro
```

### **Environment Variables (în cPanel):**
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://selectrik.ro
# DATABASE_PATH nu e necesar - se auto-calculează în cod
JWT_SECRET=[your-secret-here]
ADMIN_EMAIL=admin@selectrik.ro
ADMIN_PASSWORD=[your-password-here]
```

## 📁 **Structura Finală pe Server:**

```
/home/selectri/
├── public_html/                      # Frontend (servit de backend)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   ├── index-[hash].css
│   │   └── ...
│   └── ...
└── selectrik/
    └── server/                       # Backend (Application root)
        ├── src/
        │   ├── index.ts
        │   ├── db/
        │   │   └── database.ts       # Path: ../../database.db
        │   ├── routes/
        │   └── ...
        ├── package.json
        ├── tsconfig.json
        ├── start.sh                  # Startup script
        ├── .env                      # Environment variables
        └── database.db               # SQLite database (auto-created la primul start)
        
        # CloudLinux va crea automat:
        └── node_modules -> [symlink la virtual env]
```

## ⚡ **Deployment Steps:**

### **Option 1: Automated (Recommended)**
```bash
chmod +x cloudlinux-deploy-updated.sh
./cloudlinux-deploy-updated.sh user@your-server.com
```

### **Option 2: Manual**
```bash
# 1. Create directory structure
ssh user@server "mkdir -p /home/selectri/{public_html,selectrik/server}"

# 2. Copy frontend
scp -r dist/* user@server:/home/selectri/public_html/

# 3. Copy backend
scp -r server/src user@server:/home/selectri/selectrik/server/
scp server/package.json user@server:/home/selectri/selectrik/server/
scp server/tsconfig.json user@server:/home/selectri/selectrik/server/
scp server/start.sh user@server:/home/selectri/selectrik/server/

# 4. Copy environment config
scp deployment-config.env user@server:/home/selectri/selectrik/server/.env

# 5. Set permissions
ssh user@server "chmod +x /home/selectri/selectrik/server/start.sh"
```

## 🔍 **Post-Deployment Verification:**

### **1. Check Files:**
```bash
ssh user@server
ls -la /home/selectri/public_html/
ls -la /home/selectri/selectrik/server/
```

### **2. Check CloudLinux Settings:**
- [ ] Application root: `/home/selectri/selectrik/server` ✅
- [ ] Startup file: `start.sh` ✅
- [ ] Node.js version selected ✅
- [ ] Application mode: Production ✅

### **3. Check Environment:**
```bash
ssh user@server "cat /home/selectri/selectrik/server/.env"
```

### **4. Start Application:**
- Folosește CloudLinux NodeJS Selector interface
- Apasă "Start" sau "Restart"

### **5. Test Application:**
```bash
# Test API
curl https://selectrik.ro/api/health

# Test Frontend
curl https://selectrik.ro
```

## ⚠️ **Common Issues:**

### **Issue 1: "Application does not exist"**
- **Cauză:** Application root incorect
- **Soluție:** Verifică că ai setat `/home/selectri/selectrik/server` (nu `/home/selectri`)

### **Issue 2: "application should not contain folder/file with such name in application root"**
- **Cauză:** Există `node_modules` în `/home/selectri/selectrik/server/`
- **Soluție:** 
  ```bash
  # Quick fix:
  ./cloudlinux-fix-nodemodules.sh user@server.com
  
  # Or manual:
  ssh user@server "rm -rf /home/selectri/selectrik/server/node_modules"
  ```
- **Apoi:** Încearcă din nou să salvezi în CloudLinux NodeJS Selector

### **Issue 3: "Frontend 404"**
- **Cauză:** Path-uri greșite în `index.ts`
- **Soluție:** Verifică că ai `../../public_html` în `index.ts`

### **Issue 4: "Database error"**
- **Cauză:** Path incorect sau permisiuni
- **Soluție:** Database-ul se creează automat în `/home/selectri/selectrik/server/database.db` - nu e nevoie de DATABASE_PATH în .env

## 🎯 **Success Indicators:**

- ✅ Frontend se încarcă la `https://selectrik.ro`
- ✅ API răspunde la `https://selectrik.ro/api/health`
- ✅ Login funcționează corect
- ✅ Popup "test version" apare în configurator
- ✅ Toate asset-urile se încarcă (CSS, JS, imagini)
- ✅ React Router funcționează (refresh pe orice pagină)

## 📝 **Notes:**

1. **CloudLinux gestionează automat `node_modules`** - nu copia manual!
2. **Backend servește frontend** - nu ai nevoie de server separat pentru frontend
3. **Database se creează automat** la primul start
4. **JWT_SECRET** trebuie schimbat în producție
5. **ADMIN_PASSWORD** trebuie schimbat după primul login

---

**Status:** ✅ **READY FOR DEPLOYMENT**

Toate verificările sunt complete! 🚀

