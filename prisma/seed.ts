/**
 * Seed Script para Plugin de Formara
 * 
 * Este script inicializa la base de datos con datos de prueba
 * para desarrollo standalone del plugin.
 * 
 * Uso:
 *   npx ts-node prisma/seed.ts
 *   o
 *   npm run db:seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Workspace de prueba
  const workspace = await prisma.workspace.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Workspace de Desarrollo',
      slug: 'dev-workspace'
    }
  });
  console.log('✅ Workspace creado:', workspace.name);

  // Usuario de prueba
  const user = await prisma.user.upsert({
    where: { email: 'dev@example.com' },
    update: {},
    create: {
      email: 'dev@example.com',
      name: 'Developer',
      workspaceId: 1,
      role: 'admin'
    }
  });
  console.log('✅ Usuario creado:', user.email);

  // TODO: Agregar datos de prueba del plugin
  // Ejemplo:
  //
  // const pluginData = await prisma.pluginData.upsert({
  //   where: { id: 1 },
  //   update: {},
  //   create: {
  //     workspaceId: 1,
  //     data: 'Sample data'
  //   }
  // });
  // console.log('✅ Plugin data creado');

  console.log('\n🎉 Seed completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

