# Formara Plugin Template

Template base para crear plugins de Formara.

## Quick Start

1. Usa este template para crear tu plugin:
```bash
git clone formara-plugin-template mi-plugin
cd mi-plugin
rm -rf .git
git init
```

2. Instala dependencias:
```bash
npm install
```

3. Levanta base de datos:
```bash
docker-compose up -d
npx prisma migrate dev
```

4. Ejecuta en sandbox:
```bash
npm run dev:sandbox
```

5. Abre http://localhost:3001/health

## Estructura

```
mi-plugin/
├── backend/
│   ├── routes.ts              # Tus endpoints
│   ├── hooks.ts               # Hooks opcionales
│   └── services/              # Lógica de negocio
├── frontend/
│   ├── index.ts               # Export principal
│   ├── components/
│   │   └── MiConfig.tsx       # UI de configuración
│   └── field-types/           # Field types custom (opcional)
├── manifest.json              # Metadata del plugin
├── dev/
│   └── sandbox.config.js      # Config del sandbox
├── package.json
└── docker-compose.yml
```

## Personalizar

1. Renombra el plugin en `package.json` y `manifest.json`
2. Edita `backend/routes.ts` con tus endpoints
3. Edita `frontend/components/MiConfig.tsx` con tu UI
4. Actualiza `dev/sandbox.config.js` con tu config

## Usar el SDK

```typescript
// Backend
import { authMiddleware, sharedPrisma } from '@formara/plugin-sdk/backend';

// Frontend
import { api, useAuth, authHeaders, Input } from '@formara/plugin-sdk/frontend';
```

Ver documentación completa en @formara/plugin-sdk


