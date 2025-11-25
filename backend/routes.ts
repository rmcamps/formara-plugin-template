import { Router, Request, Response } from 'express';

/**
 * Router del plugin PLUGIN_NAME
 */
export const pluginRouter = Router();

/**
 * GET /api/plugins/PLUGIN_NAME/health
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

export default pluginRouter;
