/**
 * Prisma Adapter - Funciona en Standalone e Integrado
 * 
 * Este adapter detecta automáticamente el contexto y usa el Prisma correcto:
 * - Standalone: usa Prisma local del plugin (../prisma/schema.prisma)
 *   El schema del plugin incluye modelos del core + modelos propios del plugin
 * - Integrado: usa Prisma compartido del core (con todos los modelos)
 *   El core tiene modelos del core + modelos de todos los plugins mergeados
 */

import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

// Crear require usando la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const require = createRequire(__filename);

let prismaInstance: PrismaClient | null = null;

/**
 * Detectar si estamos en modo standalone o integrado
 * 
 * Lógica mejorada basada en el SDK:
 * - Standalone: cwd está en plugins/PLUGIN_NAME/backend/
 * - Integrado: cwd está en backend/ o formara/backend/ (sin estar en plugins)
 */
function isStandaloneMode(): boolean {
  const cwd = process.cwd();
  
  // Si cwd termina en 'backend' y NO está dentro de 'plugins', estamos integrados
  // Si está dentro de 'plugins', estamos en standalone
  const isIntegrated = cwd.endsWith('/backend') && !cwd.includes('/plugins/');
  
  console.log(`[Prisma] Detectando modo - cwd: ${cwd}, isIntegrated: ${isIntegrated}`);
  
  return !isIntegrated;
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
    // Modo standalone: usar Prisma local con PostgreSQL del plugin
    // DATABASE_URL debe apuntar a: postgresql://formara:formara_dev@localhost:5433/PLUGIN_NAME_plugin
    console.log('[Prisma] Modo standalone - usando PostgreSQL local del plugin (puerto 5435)');
    console.log('[Prisma] DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@') || 'no definido');
    
    // Importar desde @prisma/client (resuelve automáticamente)
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    }) as PrismaClient;
    
    console.log('[Prisma] ✅ Prisma client generado correctamente');
  } else {
    // Modo integrado: usar Prisma compartido del core
    // DATABASE_URL debe apuntar a: postgresql://formara:flexa123difficult@localhost:5432/formara
    // Las tablas del plugin están en schema 'public' (mergeadas al core)
    console.log('[Prisma] Modo integrado - usando Prisma compartido del core (schema public)');
    console.log('[Prisma] DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@') || 'no definido');
    
    try {
      // En modo integrado, usar ruta absoluta para evitar problemas con symlinks
      // Buscar primero en dist (si está compilado), luego en src (desarrollo con tsx)
      let sharedPrismaPath = path.resolve(process.cwd(), 'dist', 'src', 'services', 'prisma.shared.js');
      if (!fs.existsSync(sharedPrismaPath)) {
        sharedPrismaPath = path.resolve(process.cwd(), 'src', 'services', 'prisma.shared.js');
      }
      console.log('[Prisma] Intentando importar desde:', sharedPrismaPath);
      
      // Usar createRequire para importar en ES Modules
      const sharedPrismaModule = require(sharedPrismaPath);
      console.log('[Prisma] Módulo prisma.shared importado, keys:', Object.keys(sharedPrismaModule));
      
      const sharedPrisma = sharedPrismaModule.sharedPrisma || sharedPrismaModule.default;
      
      if (!sharedPrisma) {
        throw new Error('sharedPrisma is undefined en el módulo importado');
      }
      
      prismaInstance = sharedPrisma as PrismaClient;
      console.log('[Prisma] ✅ Prisma compartido importado correctamente');
    } catch (error: any) {
      console.error('[Prisma] ❌ Error importando prisma.shared:', error.message);
      console.log('[Prisma] Fallback a PrismaClient local');
      // Fallback a local si falla
      prismaInstance = new PrismaClient() as PrismaClient;
    }
  }

  return prismaInstance;
}

// Export por defecto para compatibilidad
// Llamar getPrismaClient() asegura que nunca sea null
export const sharedPrisma = getPrismaClient();

// Export named
export { sharedPrisma as prisma };
