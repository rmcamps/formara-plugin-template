/**
 * Ejemplo de field type custom
 * 
 * Este archivo muestra cómo crear un tipo de campo personalizado
 * Descomenta y personaliza según tus necesidades
 */

import React from 'react';
import { z } from 'zod';
import { 
  Input,
  type FieldTypeDefinition,
  type FieldPreviewProps,
  type FieldRenderProps
} from '@formara/plugin-sdk/frontend';

const ExampleFieldType: FieldTypeDefinition = {
  // ID único del tipo
  id: 'example-field',
  
  // Nombre que aparecerá en el dropdown del editor
  label: 'Campo de Ejemplo',
  
  // Categoría para agrupar en el editor
  category: 'custom',
  
  // Descripción
  description: 'Un campo de ejemplo para mostrar cómo crear field types',
  
  // Hint para la IA (opcional)
  aiHint: 'Este campo acepta texto simple de hasta 100 caracteres',
  
  // Ícono (opcional)
  icon: '📝',
  
  /**
   * Renderizar preview en el editor de formularios
   * Se muestra cuando el usuario está diseñando el formulario
   */
  renderPreview: ({ title, description, onChange }: FieldPreviewProps) => (
    <div>
      <Input
        placeholder={title}
        disabled
        className="w-full"
      />
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  ),
  
  /**
   * Renderizar campo interactivo en el formulario
   * Se muestra cuando el usuario está llenando el formulario
   */
  renderField: ({ value, onChange, config, disabled }: FieldRenderProps) => (
    <Input
      value={value || ''}
      onChange={(e: any) => onChange(e.target.value)}
      placeholder={config.placeholder || 'Escribe algo...'}
      disabled={disabled}
      maxLength={100}
    />
  ),
  
  /**
   * Generar schema de validación con Zod
   * Define las reglas de validación del campo
   */
  generateZodSchema: (config) => {
    let schema = z.string().max(100, 'Máximo 100 caracteres');
    
    if (config.required) {
      schema = schema.min(1, 'Este campo es requerido');
    } else {
      return schema.optional();
    }
    
    return schema;
  },
  
  /**
   * Validación custom adicional (opcional)
   * Se ejecuta cuando se procesan/validan los datos
   */
  validate: (value: any, config) => {
    if (!value) return { valid: true };
    
    // Ejemplo: validar que no tenga números
    if (/\d/.test(value)) {
      return {
        valid: false,
        error: 'No se permiten números',
        message: 'Validación: sin números'
      };
    }
    
    return {
      valid: true,
      message: 'Validación exitosa'
    };
  },
  
  // Valor por defecto
  defaultValue: ''
};

export default ExampleFieldType;


