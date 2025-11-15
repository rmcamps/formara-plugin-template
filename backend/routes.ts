/**
 * Rutas del plugin
 * Este archivo se monta en /api/plugins/mi-plugin/
 */

import { Router } from 'express';
import { authMiddleware, sharedPrisma } from '@formara/plugin-sdk/backend';

const router = Router();
const prisma = sharedPrisma;

// Aplicar autenticación a todas las rutas
router.use(authMiddleware as any);

/**
 * GET /api/plugins/mi-plugin/config
 * Obtiene la configuración del plugin para un workspace
 */
router.get('/config', async (req: any, res) => {
  try {
    const workspaceId = Number(req.query.workspaceId || req.workspaceId || 0);
    
    if (!workspaceId) {
      return res.status(400).json({ error: 'workspaceId requerido' });
    }
    
    // TODO: Implementar tu lógica aquí
    // Ejemplo: buscar config en DB
    // const config = await prisma.miTabla.findFirst({ where: { workspaceId } });
    
    res.json({
      workspaceId,
      mensaje: 'Plugin funcionando correctamente',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error' });
  }
});

/**
 * POST /api/plugins/mi-plugin/config
 * Guarda la configuración del plugin
 */
router.post('/config', async (req: any, res) => {
  try {
    const workspaceId = Number(req.body.workspaceId || req.workspaceId || 0);
    
    if (!workspaceId) {
      return res.status(400).json({ error: 'workspaceId requerido' });
    }
    
    // TODO: Implementar tu lógica aquí
    // Ejemplo: guardar config en DB
    
    res.json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error' });
  }
});

export default router;


