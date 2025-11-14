# Getting Started - Crear un Plugin de Formara

## Paso 1: Clonar este template

```bash
git clone formara-plugin-template mi-super-plugin
cd mi-super-plugin
rm -rf .git
git init
```

## Paso 2: Personalizar

1. **Edita `package.json`:**
```json
{
  "name": "@formara/plugin-mi-super-plugin",
  "description": "Mi plugin hace X, Y, Z"
}
```

2. **Edita `manifest.json`:**
```json
{
  "name": "mi-super-plugin",
  "displayName": "Mi Super Plugin",
  "description": "Hace cosas increíbles"
}
```

3. **Renombra componentes:**
- `frontend/components/MiConfig.tsx` → `MiSuperPluginConfig.tsx`
- Actualiza exports en `frontend/index.ts`

## Paso 3: Instalar y ejecutar

```bash
# Instalar (incluye SDK)
npm install

# Levantar PostgreSQL
docker-compose up -d

# Crear base de datos
npx prisma migrate dev --name init

# Ejecutar sandbox
npm run dev:sandbox
```

Verás:
- Backend en http://localhost:3001
- Frontend shell en http://localhost:5174

## Paso 4: Desarrollar

### Backend (backend/routes.ts)

```typescript
import { Router } from 'express';
import { authMiddleware, sharedPrisma } from '@formara/plugin-sdk/backend';

const router = Router();
router.use(authMiddleware);

router.get('/mi-endpoint', async (req, res) => {
  // Tu código aquí
  res.json({ ok: true });
});

export default router;
```

### Frontend (frontend/components/MiConfig.tsx)

```typescript
import { api, useAuth, authHeaders, Input } from '@formara/plugin-sdk/frontend';

export default function MiConfig({ workspaceId }) {
  const { token } = useAuth();
  // Tu código aquí
}
```

### Field Types (opcional)

Ver `frontend/field-types/example-field.tsx` para ejemplo completo.

## Paso 5: Probar

### Test de API
```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/plugins/mi-super-plugin/config?workspaceId=1
```

### Test Visual
Abre http://localhost:5174 y usa las 3 tabs:
- **Configuration**: Tu componente funcionando
- **Field Types**: Playground interactivo
- **API Test**: Cliente REST visual

## Paso 6: Deploy

```bash
git add .
git commit -m "Initial version"
git remote add origin git@github.com:tu-usuario/formara-plugin-mi-super-plugin.git
git push -u origin main
```

Formara Core integrará tu plugin automáticamente.

## Tips

- Hot-reload está habilitado (cambios se reflejan automáticamente)
- Logs de backend en consola
- Console.log del frontend en DevTools del browser
- DB PostgreSQL persiste en volume de Docker

## Ayuda

Ver documentación completa en:
- `DEVELOPMENT.md` - Guía técnica
- `@formara/plugin-sdk/README.md` - API del SDK
- `@formara/plugin-sdk/DEVELOPER_GUIDE.md` - Guía completa

