/**
 * Prisma Client Local para Plugin ARCA
 * 
 * Este archivo se usa en modo standalone del plugin.
 * En modo integrado (con el core), usa prisma.shared.ts del core.
 */

// Importar desde el node_modules de la raíz del plugin
// El schema principal está en ../prisma/schema.prisma
import { PrismaClient } from '../../node_modules/@prisma/client';

// Instancia única de Prisma para el plugin standalone
let prismaInstance: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return prismaInstance;
}

// Export por defecto para compatibilidad
export const sharedPrisma = getPrismaClient();

// Export named
export { sharedPrisma as prisma };

