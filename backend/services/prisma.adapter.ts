/**
 * Prisma Adapter - Funciona en Standalone e Integrado
 * 
 * Este adapter detecta automáticamente el contexto y usa el Prisma correcto:
 * - Standalone: usa Prisma local del plugin (../prisma/schema.prisma)
 * - Integrado: usa Prisma compartido del core (con todos los modelos)
 */

import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

let prismaInstance: PrismaClient | null = null;

/**
 * Detectar si estamos en modo standalone o integrado
 */
function isStandaloneMode(): boolean {
  // En standalone: estamos en plugins/PLUGIN_NAME/backend/
  // En integrado: estamos en backend/src/plugins/PLUGIN_NAME/ (symlink)
  const cwd = process.cwd();
  
  // Si el path incluye "backend/src/plugins", estamos integrados
  return !cwd.includes('backend/src/plugins') && !cwd.includes('backend/dist/plugins');
}

/**
 * Obtener Prisma Client según el contexto
 */
export function getPrismaClient(): PrismaClient {
  if (prismaInstance) {
    return prismaInstance;
  }

  const standalone = isStandaloneMode();
  
  if (standalone) {
    // Modo standalone: usar Prisma local
    console.log('[Prisma] Modo standalone - usando base de datos local');
    
    // Importar desde el node_modules de la raíz del plugin
    const { PrismaClient: LocalPrismaClient } = require('../../node_modules/@prisma/client');
    prismaInstance = new LocalPrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  } else {
    // Modo integrado: usar Prisma compartido del core
    console.log('[Prisma] Modo integrado - usando Prisma compartido del core');
    
    try {
      const { sharedPrisma } = require('../../services/prisma.shared');
      prismaInstance = sharedPrisma;
    } catch (error) {
      console.error('[Prisma] Error importando prisma.shared, fallback a local');
      // Fallback a local si falla
      prismaInstance = new PrismaClient();
    }
  }

  return prismaInstance;
}

// Export por defecto para compatibilidad
export const sharedPrisma = getPrismaClient();

// Export named
export { sharedPrisma as prisma };
