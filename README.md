# Plugin Template para Formara

Este es el template base para crear nuevos plugins en Formara.

## Estructura

```
template/
├── manifest.json          # Definición del plugin
├── package.json           # Scripts y dependencias raíz
├── frontend/              # Frontend del plugin
│   ├── index.ts          # Exportaciones del plugin
│   ├── field-types/      # Field types personalizados
│   ├── components/       # Componentes de configuración
│   └── dev.tsx           # Sandbox de desarrollo
├── backend/              # Backend del plugin
│   ├── routes.ts         # Endpoints del plugin
│   ├── actions.ts        # Actions del plugin
│   └── dev-server.ts     # Servidor standalone
└── prisma/               # Schema de base de datos
    └── schema.prisma
```

## Instalación

```bash
# Instalar dependencias (raíz, backend y frontend)
npm install
```

## Desarrollo

```bash
# Iniciar backend y frontend en modo desarrollo
npm run dev

# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend
```

## Puertos

- **Frontend**: http://localhost:4001
- **Backend**: http://localhost:4002

## Componentes Incluidos

Este template incluye ejemplos de:

- ✅ **Field Type**: `dummy-field` - Campo de ejemplo
- ✅ **Action**: `dummy-action` - Acción de ejemplo
- ✅ **Integration**: `dummy-integration` - Integración de ejemplo
- ✅ **Generate**: `dummy-generate` - Generate de ejemplo
- ✅ **Distribute**: `dummy-distribute` - Distribute de ejemplo

## Uso

1. Copia este template: `cp -r plugins/template plugins/mi-plugin`
2. Reemplaza `PLUGIN_NAME` con el nombre de tu plugin
3. Personaliza los componentes según tus necesidades
4. Ejecuta `npm run dev` para probar

## Más Información

Ver la documentación en `plugins/CREATE_PLUGIN_GUIDE.md`

## Base de Datos

### Modo Standalone (Desarrollo del Plugin)

1. **Iniciar PostgreSQL local:**
   ```bash
   docker-compose up -d
   ```

2. **Configurar DATABASE_URL:**
   ```bash
   cp .env.example backend/.env
   # Editar backend/.env y configurar:
   # DATABASE_URL=postgresql://formara:formara_dev@localhost:5435/PLUGIN_NAME_plugin?schema=public
   ```

3. **Generar Prisma Client:**
   ```bash
   cd backend
   npm run db:generate
   ```

4. **Ejecutar migraciones:**
   ```bash
   npm run db:migrate
   # O para desarrollo rápido:
   npm run db:push
   ```

### Modo Integrado (Desarrollo con Core)

1. **NO arrancar docker-compose del plugin**
2. **Usar DATABASE_URL del core:**
   ```bash
   # DATABASE_URL=postgresql://formara:flexa123difficult@localhost:5432/formara?schema=public
   ```
3. El Prisma adapter detectará automáticamente el modo integrado y usará el Prisma compartido del core.

## Estructura de Prisma

- `prisma/schema.prisma`: Schema completo (modelos del core + modelos del plugin)
- `backend/services/prisma.adapter.ts`: Adapter que detecta automáticamente el modo (standalone/integrado)

El adapter funciona automáticamente:
- **Standalone**: Usa Prisma local con PostgreSQL en puerto 5435
- **Integrado**: Usa Prisma compartido del core con PostgreSQL en puerto 5432

## Actions

Los actions son botones/comandos ejecutables que aparecen en diferentes contextos de la UI.

### Tipos de Actions

#### 1. Action Simple (sin UI)

Se ejecuta directamente al hacer clic:

```typescript
// backend/actions.ts
{
  id: 'mi-action-simple',
  pluginName: 'mi-plugin',
  label: 'Acción Simple',
  icon: '⚡',
  description: 'Descripción detallada de lo que hace esta acción',
  contexts: ['form-record'],
  
  handler: async (data) => {
    // Lógica de la acción
    return { success: true, message: 'Completado' };
  }
}
```

#### 2. Action con UI (configuración interactiva)

Muestra un modal para que el usuario configure parámetros:

```typescript
// backend/actions.ts
{
  id: 'mi-action-con-ui',
  pluginName: 'mi-plugin',
  label: 'Acción con UI',
  icon: '🎨',
  description: 'Descripción detallada. Esta acción muestra UI para configurar opciones...',
  contexts: ['form-record'],
  
  hasUI: true,                    // ← Indica que tiene UI
  uiComponent: 'MiAction',        // ← Nombre del componente (sin .tsx)
  
  handler: async (data, params) => {
    // params contiene lo configurado por el usuario
    const { opcion1, opcion2 } = params;
    // Lógica usando los parámetros
    return { success: true, message: 'Completado' };
  }
}
```

```tsx
// frontend/components/MiAction.tsx
import { ActionUIProps, useActionRecords } from '@/core/actions/ActionUIBase';

export function MiAction({ context, onExecute, onCancel }: ActionUIProps) {
  const records = useActionRecords(context);
  const [opcion1, setOpcion1] = useState('');
  
  return (
    <div className="p-6">
      <h2>Configurar Mi Action</h2>
      <input value={opcion1} onChange={e => setOpcion1(e.target.value)} />
      <button onClick={() => onExecute({ opcion1 })}>Ejecutar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}
```

```typescript
// frontend/index.ts
export { MiAction } from './components/MiAction';
```

### Convenciones para Actions con UI

1. **Nombre del componente**: SIEMPRE termina en `Action.tsx` (ej: `GenerateDocumentAction.tsx`, `SendEmailAction.tsx`)
2. **Implementar `ActionUIProps`**: Recibe `context`, `onExecute`, `onCancel`
3. **Exportar en `index.ts`**: Para que el core pueda cargarlo
4. **Validación en el UI**: El componente valida parámetros antes de llamar `onExecute`

### Helpers Disponibles

```typescript
import {
  ActionUIProps,
  useActionRecords,      // Extrae registros (siempre array)
  useActionDocuments,    // Extrae documentos (siempre array)
  isBatchOperation,      // true si es operación múltiple
  getItemCount,          // Cantidad de items
  getContextType,        // Tipo de contexto
} from '@/core/actions/ActionUIBase';
```

### Ejemplo Completo

Ver `frontend/components/ExampleAction.tsx` para un ejemplo completo con:
- Múltiples tipos de inputs (texto, checkbox, select)
- Validación de parámetros
- Preview de datos
- Soporte para batch
- Manejo de errores

## Hooks

El template incluye ejemplos de hooks que responden a eventos del sistema:

### Hooks Disponibles

1. **`dummy-file-processed`** (`file.processed`)
   - Se ejecuta cuando un archivo es procesado con IA
   - Ejemplo: Cuenta campos extraídos del archivo

2. **`dummy-form-record-created`** (`form.record.created`)
   - Se ejecuta cuando se crea un nuevo registro de formulario
   - Ejemplo: Cuenta campos con datos en el registro

3. **`dummy-form-record-updated`** (`form.record.updated`)
   - Se ejecuta cuando se actualiza un registro de formulario
   - Ejemplo: Detecta qué campos cambiaron

### Archivo de Hooks

Los hooks están definidos en `backend/hooks.ts` y deben exportar un array de `Omit<HookDefinition, 'pluginName'>[]`.

Los hooks también deben estar declarados en `manifest.json` en `capabilities.hooks`.

### Eventos Disponibles

Ver `core/hooks/types.ts` para la lista completa de eventos disponibles:
- `file.uploaded`, `file.processed`, `file.validated`
- `form.record.created`, `form.record.updated`, `form.record.deleted`
- `document.generated`, `document.sent`
- Y más...

