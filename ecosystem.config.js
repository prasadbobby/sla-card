module.exports = {
  apps: [{
    name: 'sla-dashboard',
    script: 'start-app.js',
    cwd: 'C:\\inetpub\\wwwroot\\sla-dashboard',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}