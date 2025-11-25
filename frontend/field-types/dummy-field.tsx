import React from 'react';
import { Input } from '@formara/plugin-sdk/ui';
import type { FieldTypeDefinition, FieldPreviewProps, FieldRenderProps } from '@core/frontend';

/**
 * Field Type Dummy - Ejemplo de campo personalizado
 * 
 * Este es un ejemplo de cómo crear un field type para el plugin.
 * Reemplaza este componente con tu lógica personalizada.
 */
const DummyFieldType: FieldTypeDefinition = {
  id: 'dummy-field',
  label: 'Campo Dummy',
  category: 'specialized' as const,
  description: 'Un campo de ejemplo para el plugin template',
  icon: '📝',
  aiHint: 'Campo de texto simple con validación básica',

  // Configuración del campo (schema de validación)
  configSchema: {
    type: 'object',
    properties: {
      placeholder: {
        type: 'string',
        description: 'Texto placeholder para el input'
      },
      maxLength: {
        type: 'number',
        description: 'Longitud máxima del texto'
      }
    }
  },

  // Componente de preview (en el editor de formularios)
  Preview: ({ config }: FieldPreviewProps) => {
    return (
      <div className="p-2 border border-gray-300 rounded">
        <Input
          placeholder={config?.placeholder || 'Campo Dummy'}
          disabled
          className="w-full"
        />
      </div>
    );
  },

  // Componente de render (en el formulario real)
  Render: ({ value, onChange, config, disabled }: FieldRenderProps) => {
    return (
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={config?.placeholder || 'Ingrese texto...'}
        maxLength={config?.maxLength || 255}
        disabled={disabled}
        className="w-full"
      />
    );
  }
};

export default DummyFieldType;
