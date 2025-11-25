import { Router, Request, Response } from 'express';
import { sharedPrisma as prisma } from './services/prisma.adapter';

/**
 * Router del plugin PLUGIN_NAME
 * 
 * Este router se monta en /api/plugins/PLUGIN_NAME/
 * 
 * El código funciona tanto en modo standalone como integrado gracias
 * al prisma.adapter que detecta automáticamente el contexto.
 */
export const pluginRouter = Router();

/**
 * GET /api/plugins/PLUGIN_NAME/health
 * 
 * Health check del plugin
 */
pluginRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    plugin: 'PLUGIN_NAME',
    version: '1.0.0',
    status: 'ok',
    mode: process.env.NODE_ENV || 'development',
    endpoints: [
      'GET /api/plugins/PLUGIN_NAME/health'
    ]
  });
});

/**
 * TODO: Agregar tus endpoints aquí
 * 
 * Ejemplo de endpoint que usa Prisma:
 * 
 * pluginRouter.get('/data', async (req: Request, res: Response) => {
 *   try {
 *     const workspaceId = req.user?.workspaceId;
 *     
 *     // Prisma funciona en standalone e integrado ✅
 *     const data = await prisma.myPluginModel.findMany({
 *       where: { workspaceId }
 *     });
 *     
 *     res.json({ data });
 *   } catch (error: any) {
 *     res.status(500).json({ error: error.message });
 *   }
 * });
 */

/**
 * Exportar router
 */
export default pluginRouter;
