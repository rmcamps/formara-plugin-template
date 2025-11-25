/**
 * Servidor Express Standalone para Plugin de Formara
 * 
 * Este servidor permite desarrollar y probar el backend del plugin
 * sin necesidad de tener el core de Formara corriendo.
 * 
 * Características:
 * - Mock de autenticación (usuario siempre logueado)
 * - CORS habilitado para el frontend del plugin
 * - Prisma client conectado a DB del plugin
 * - Puede llamar servicios del core via REST API
 * 
 * Uso:
 *   npm run dev  # Inicia el servidor en puerto configurado
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// TODO: Importar router del plugin
// import pluginRouter from './routes';

const app = express();
const prisma = new PrismaClient();

// Configuración desde .env
const PORT = parseInt(process.env.PORT || '4001');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5182';
const CORE_API_URL = process.env.CORE_API_URL || 'http://localhost:3000';

// CORS: permitir requests del frontend del plugin
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * Middleware de Mock de Autenticación
 * En desarrollo standalone, siempre retorna un usuario autenticado
 */
app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    id: 1,
    email: 'dev@example.com',
    name: 'Developer',
    workspaceId: 1,
    role: 'admin'
  };
  
  req.headers.authorization = 'Bearer mock-dev-token';
  
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    mode: 'standalone',
    timestamp: new Date().toISOString(),
    config: {
      port: PORT,
      frontendUrl: FRONTEND_URL,
      coreApiUrl: CORE_API_URL
    }
  });
});

// TODO: Montar router del plugin
// Ejemplo:
// app.use('/api/plugins/PLUGIN_NAME', pluginRouter);

// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Plugin Backend (Standalone Mode)');
  console.log('');
  console.log(`   Server:      http://localhost:${PORT}`);
  console.log(`   Frontend:    ${FRONTEND_URL}`);
  console.log(`   Core API:    ${CORE_API_URL}`);
  console.log('');
  console.log(`   User:        dev@example.com (mocked)`);
  console.log(`   Workspace:   1`);
  console.log('');
  console.log('✨ Ready for development!');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n👋 Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n👋 Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;

