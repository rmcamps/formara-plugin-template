import { createDevServer } from '@formara/plugin-sdk/sandbox/backend/dev-server';
import pluginRouter from './routes.js';

const PORT = parseInt(process.env.PORT || '4002');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4001';
const CORE_API_URL = process.env.CORE_API_URL || 'http://localhost:3000';

const mockUser = {
  id: 1,
  email: 'dev@example.com',
  name: 'Developer',
  workspaceId: 1,
  role: 'admin',
};

// Crear servidor - el SDK ya llama a app.listen() internamente
const app = createDevServer({
  port: PORT,
  frontendUrl: FRONTEND_URL,
  coreApiUrl: CORE_API_URL,
  mockUser,
});

// Sobrescribir /health DESPUÉS de createDevServer
// Express permite sobrescribir rutas si se definen después
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    plugin: 'PLUGIN_NAME',
    mode: 'standalone',
    timestamp: new Date().toISOString(),
    config: {
      port: PORT,
      frontendUrl: FRONTEND_URL,
      coreApiUrl: CORE_API_URL,
    },
  });
});

app.get('/api/templates', (req, res) => {
  res.json([]);
});

app.use('/api/plugins/PLUGIN_NAME', pluginRouter as any);

// El SDK ya llama a app.listen() internamente
setTimeout(() => {
  console.log(`   User:        ${mockUser.email} (mocked)`);
  console.log(`   Workspace:   ${mockUser.workspaceId}`);
  console.log('');
  console.log('✨ Ready for development!');
  console.log('');
}, 100);
