# 🚀 Deployment Guide - Selectrik

## 📋 Structura Deployment

```
/var/www/selectrik/
├── public/                    # Frontend (din dist/)
│   ├── index.html
│   ├── assets/
│   ├── images/
│   └── videos/
├── server/                     # Backend Node.js
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   ├── .env
│   └── index.js
└── logs/                      # Logurile aplicației
```

## 🔧 Pași pentru Deployment

### 1. **Pregătire Server**
```bash
# Instalează Node.js și PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2 tsx

# Creează directoarele
sudo mkdir -p /var/www/selectrik/{public,server,logs}
sudo chown -R $USER:$USER /var/www/selectrik
```

### 2. **Deployment Automat**
```bash
# Folosește scriptul de deployment
./deploy.sh user@your-server.com
```

### 3. **Deployment Manual**

#### **Frontend:**
```bash
# Build frontend
npm run build

# Copiază fișierele
scp -r dist/* user@server:/var/www/selectrik/public/
```

#### **Backend:**
```bash
# Copiază backend-ul
scp -r server/* user@server:/var/www/selectrik/server/

# Copiază configurația
scp deployment-config.env user@server:/var/www/selectrik/server/.env
```

#### **Pe server:**
```bash
# Instalează dependințele
cd /var/www/selectrik/server
npm install --production

# Pornește cu PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## ⚙️ Configurare .env

Creează fișierul `.env` în `/var/www/selectrik/server/.env`:

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://selectrik.ro
DATABASE_PATH=/var/www/selectrik/server/database.sqlite
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_EMAIL=admin@selectrik.ro
ADMIN_PASSWORD=Admin123!
```

## 🌐 Configurare Web Server

### **Opțiunea 1: Apache cu .htaccess**
Fișierul `.htaccess` este deja inclus în build și configurează:
- React Router (SPA) support
- Security headers
- Compression (GZIP)
- Browser caching
- Error handling

### **Opțiunea 2: Nginx**
```bash
# Copiază configurația Nginx
sudo cp nginx.conf /etc/nginx/sites-available/selectrik
sudo ln -s /etc/nginx/sites-available/selectrik /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### **Opțiunea 3: Node.js direct (port 3001)**
Backend-ul servește deja fișierele statice și gestionează React Router.

## 🔍 Comenzi Utile

```bash
# Verifică statusul
pm2 status

# Restart aplicația
pm2 restart selectrik-backend

# Vezi logurile
pm2 logs selectrik-backend

# Stop aplicația
pm2 stop selectrik-backend

# Update aplicația
pm2 reload selectrik-backend
```

## 🛡️ Securitate

1. **Schimbă JWT_SECRET** în .env
2. **Schimbă parola admin** în .env
3. **Configurează firewall** pentru portul 3001
4. **Folosește HTTPS** cu Let's Encrypt
5. **Backup regulat** pentru baza de date

## 📊 Monitoring

```bash
# Monitorizare în timp real
pm2 monit

# Vezi resursele
pm2 show selectrik-backend
```

## 🚨 Troubleshooting

### **Port ocupat:**
```bash
sudo lsof -i :3001
sudo kill -9 PID
```

### **Permisiuni:**
```bash
sudo chown -R $USER:$USER /var/www/selectrik
```

### **Loguri:**
```bash
tail -f /var/www/selectrik/logs/combined.log
```
