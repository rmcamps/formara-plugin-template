# Mock Data para Testing de Actions

Esta carpeta contiene datos de prueba para ejecutar actions del plugin en el sandbox.

## Archivos

- `documents.json` - Documentos de ejemplo para actions con contexto "document"
- `form-records.json` - Registros de formulario para actions con contexto "form-record"

## Formato

Cada archivo contiene un array de objetos con:
- `id` - Identificador único del mock
- `name` - Nombre descriptivo para mostrar en el selector
- `context` - Tipo de contexto ("document", "form-record", etc.)
- Datos del contexto según el tipo

## Uso

El sandbox lee estos archivos y los muestra en el selector de "Datos de prueba" en el tab de Actions.

## Personalizar

Agrega o modifica los mocks según las necesidades de tu plugin.

Ejemplo para agregar un nuevo mock:

```json
{
  "id": "mi-caso-especial",
  "name": "Caso Especial - Descripción",
  "context": "form-record",
  "formRecord": {
    "id": 3,
    "data": {
      // Tus datos aquí
    }
  }
}
```

