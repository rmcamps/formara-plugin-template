# Guía de Desarrollo

## Setup Inicial

```bash
npm install
docker-compose up -d
npx prisma migrate dev
```

## Desarrollo

```bash
npm run dev:sandbox
```

Esto levanta:
- Backend en http://localhost:3001
- API en http://localhost:3001/api/plugins/mi-plugin

## Estructura del Código

### Backend

`backend/routes.ts` - Define tus endpoints aquí.

Ejemplo básico:
```typescript
import { Router } from 'express';
import { authMiddleware, sharedPrisma } from '@formara/plugin-sdk/backend';

const router = Router();
router.use(authMiddleware);

router.get('/items', async (req, res) => {
  const workspaceId = req.workspaceId;
  // Tu lógica aquí
  res.json({ items: [] });
});

export default router;
```

### Frontend

`frontend/components/MiConfig.tsx` - UI del plugin.

Ejemplo básico:
```typescript
import { api, useAuth, authHeaders } from '@formara/plugin-sdk/frontend';

export default function MiConfig({ workspaceId }) {
  const { token } = useAuth();
  
  useEffect(() => {
    fetch(api('/api/plugins/mi-plugin/items'), {
      headers: authHeaders(token)
    })
      .then(r => r.json())
      .then(setItems);
  }, []);
  
  return <div>Tu UI aquí</div>;
}
```

### Field Types (Opcional)

Si tu plugin define tipos de campo custom:

`frontend/field-types/mi-tipo.tsx`:
```typescript
import { 
  Input,
  type FieldTypeDefinition 
} from '@formara/plugin-sdk/frontend';
import { z } from 'zod';

const MiTipoFieldType: FieldTypeDefinition = {
  id: 'mi-tipo',
  label: 'Mi Tipo',
  category: 'custom',
  
  renderPreview: ({ title }) => (
    <Input placeholder={title} disabled />
  ),
  
  renderField: ({ value, onChange }) => (
    <Input 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  
  generateZodSchema: (config) => {
    return config.required ? z.string().min(1) : z.string().optional();
  },
  
  defaultValue: ''
};

export default MiTipoFieldType;
```

Luego exporta en `frontend/index.ts`:
```typescript
import MiTipo from './field-types/mi-tipo';

export const fieldTypes = [MiTipo];
```

## Testing

### Test de API

```bash
# Health check
curl http://localhost:3001/health

# Tu endpoint
curl http://localhost:3001/api/plugins/mi-plugin/config?workspaceId=1
```

### Test de UI

Abre http://localhost:5174 (cuando sandbox shell esté implementado)

## Deploy

1. Push a tu repo de Git
2. Formara Core lo integrará automáticamente
3. Sin cambios necesarios en el código

## Troubleshooting

### Error: Cannot find module '@formara/plugin-sdk'

```bash
npm install
```

### Error: Database connection

```bash
docker-compose up -d
# Verificar
docker ps | grep postgres
```

### Puerto ya en uso

Cambia el puerto en `dev/sandbox.config.js`:
```javascript
backend: { port: 3002 }
```


