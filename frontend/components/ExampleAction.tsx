/**
 * ExampleAction
 * 
 * Componente UI para el action 'PLUGIN_NAME:example-with-ui'
 * 
 * CONVENCIÓN: Los componentes UI de actions se nombran XXXXXAction.tsx
 * DEBEN implementar la interfaz ActionUIProps del core
 * 
 * Este es un ejemplo de referencia para crear nuevos actions con UI
 */

import React, { useState } from 'react';
import type { ActionUIProps } from '@/core/actions/types';
import { 
  useActionRecords, 
  isBatchOperation, 
  getItemCount,
  getContextType
} from '@/core/actions/ActionUIBase';

export function ExampleAction({ context, onExecute, onCancel }: ActionUIProps) {
  // ============================================
  // Usar helpers para extraer datos del contexto
  // ============================================
  const records = useActionRecords(context);
  const isBatch = isBatchOperation(context);
  const itemCount = getItemCount(context);
  const contextType = getContextType(context);
  
  // ============================================
  // Estado local del componente
  // ============================================
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState('opcion-a');
  
  // ============================================
  // Handlers
  // ============================================
  const handleConfirm = () => {
    // Validar parámetros si es necesario
    if (!option1.trim()) {
      alert('Por favor ingresa un valor para la opción 1');
      return;
    }
    
    // Llamar onExecute con los parámetros configurados
    // Estos parámetros se enviarán al backend en el handler
    onExecute({
      option1,
      option2,
      option3,
      recordCount: itemCount
    });
  };
  
  // ============================================
  // Render
  // ============================================
  return (
    <div className="p-6">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        Ejemplo de Action con UI
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Este es un ejemplo de referencia para crear actions con UI interactiva
      </p>
      
      {/* Alerta si es batch */}
      {isBatch && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            ℹ️ Se procesarán {itemCount} registros
          </p>
        </div>
      )}
      
      {/* Formulario de configuración */}
      <div className="space-y-4">
        
        {/* Opción 1: Input de texto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Opción 1 (texto requerido)
          </label>
          <input 
            type="text" 
            value={option1} 
            onChange={e => setOption1(e.target.value)}
            placeholder="Ingresa un valor"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        {/* Opción 2: Checkbox */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={option2} 
              onChange={e => setOption2(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Opción 2 (checkbox)
            </span>
          </label>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Activa esta opción para habilitar procesamiento especial
          </p>
        </div>
        
        {/* Opción 3: Select/Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Opción 3 (select)
          </label>
          <select 
            value={option3} 
            onChange={e => setOption3(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="opcion-a">Opción A</option>
            <option value="opcion-b">Opción B</option>
            <option value="opcion-c">Opción C</option>
          </select>
        </div>
        
        {/* Preview de datos (opcional) */}
        {records.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview de datos
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Primer registro (ID: {records[0].id})
            </p>
            <pre className="text-xs bg-white dark:bg-gray-900 p-2 rounded overflow-auto max-h-48">
              {JSON.stringify(records[0].data, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Información contextual */}
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Contexto:</strong> {contextType} | <strong>Items:</strong> {itemCount}
          </p>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="mt-6 flex justify-end gap-3">
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleConfirm}
          disabled={!option1.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Ejecutar {isBatch && `(${itemCount} items)`}
        </button>
      </div>
    </div>
  );
}


