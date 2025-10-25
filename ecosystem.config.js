module.exports = {
  apps: [{
    name: 'selectrik-backend',
    script: 'src/index.ts',
    interpreter: 'tsx',
    cwd: '/var/www/selectrik/server',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/www/selectrik/logs/err.log',
    out_file: '/var/www/selectrik/logs/out.log',
    log_file: '/var/www/selectrik/logs/combined.log',
    time: true
  }]
};
