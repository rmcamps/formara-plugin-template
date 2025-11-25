/**
 * PM2 Configuration para Plugin de Formara
 * 
 * Ejecuta frontend y backend juntos con logs centralizados.
 * 
 * Uso:
 *   pm2 start ecosystem.config.js
 *   pm2 logs              # Ver todos los logs juntos
 *   pm2 stop all
 *   pm2 restart all
 *   pm2 monit             # Monitor de recursos
 */

module.exports = {
  apps: [
    {
      name: 'PLUGIN_NAME-backend',
      cwd: './backend',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: BACKEND_PORT,
        FRONTEND_URL: 'http://localhost:FRONTEND_PORT',
        CORE_API_URL: 'http://localhost:3000',
        DATABASE_URL: 'file:../prisma/dev.db'
        // TODO: Agregar variables específicas del plugin aquí
        // Ejemplo:
        // AFIP_ENVIRONMENT: 'PROD',
        // AFIP_CUIT_TITULAR: '12345678901',
        // API_KEY: 'your-api-key',
      },
      watch: false,
      autorestart: true,
      max_restarts: 3,
      min_uptime: '5s',
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      time: true
    },
    {
      name: 'PLUGIN_NAME-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development'
      },
      watch: false,
      autorestart: true,
      max_restarts: 3,
      min_uptime: '5s',
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      time: true
    }
  ]
};
