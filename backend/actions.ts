/**
 * Actions del plugin Template
 * 
 * Define botones/comandos ejecutables para el plugin
 */

// Importar tipos del core
import type {
  ActionDefinition,
  ActionContextData,
  ActionResult,
} from '@formara/plugin-sdk/contracts/backend';

/**
 * Action: Dummy Action (sin UI)
 * 
 * Ejemplo de acción simple que se ejecuta directamente sin UI
 */
const dummyAction: ActionDefinition = {
  id: 'dummy-action',
  pluginName: 'PLUGIN_NAME',
  label: 'Acción Simple',
  icon: '⚡',
  description: 'Ejemplo de acción simple sin UI. Se ejecuta directamente al hacer clic.',
  contexts: ['document', 'record'],
  requiresFields: [],
  buttonVariant: 'primary',
  showInMenu: true,
  showInToolbar: true,

  handler: async (data: ActionContextData): Promise<ActionResult> => {
    try {
      console.log('[Dummy Action] Ejecutando acción dummy con datos:', data);

      // Aquí iría la lógica de la acción
      // Por ejemplo, procesar datos, hacer llamadas a APIs, etc.

      return {
        success: true,
        message: 'Acción dummy ejecutada correctamente',
        data: {
          timestamp: new Date().toISOString(),
          context: data.context,
        },
        notification: {
          type: 'success',
          message: '✅ Acción dummy completada'
        }
      };
    } catch (error: any) {
      console.error('[Dummy Action] Error:', error);
      return {
        success: false,
        message: 'Error al ejecutar acción dummy',
        error: error.message || 'Error desconocido',
        notification: {
          type: 'error',
          message: '❌ Error al ejecutar acción'
        }
      };
    }
  }
};

/**
 * Action: Example with UI
 * 
 * Ejemplo de acción CON UI interactiva
 * Muestra un modal para que el usuario configure parámetros antes de ejecutar
 */
const exampleWithUIAction: ActionDefinition = {
  id: 'example-with-ui',
  pluginName: 'PLUGIN_NAME',
  label: 'Ejemplo con UI',
  icon: '🎨',
  description: 'Ejemplo de acción con UI interactiva. Muestra un formulario para configurar parámetros antes de ejecutar. Soporta procesamiento batch de múltiples registros.',
  contexts: ['record'],
  
  // Configuración UI
  hasUI: true,
  uiComponent: 'ExampleAction',  // Nombre del componente en frontend/components/
  
  buttonVariant: 'primary',
  showInMenu: true,
  showInToolbar: true,

  handler: async (data: ActionContextData, params?: any): Promise<ActionResult> => {
    try {
      console.log('[Example with UI] Ejecutando con params:', params);
      console.log('[Example with UI] Context data:', data);
      
      // Obtener registros (batch o único)
      const records = data.records || (data.record ? [data.record] : []);
      
      // params contiene los valores que el usuario configuró en el UI
      const { option1, option2, option3 } = params || {};

      // Aquí iría la lógica de la acción usando los parámetros
      // Por ejemplo: procesar cada registro con las opciones seleccionadas
      
      return {
        success: true,
        message: `Acción ejecutada con ${records.length} registro(s)`,
        data: {
          recordCount: records.length,
          params,
          timestamp: new Date().toISOString(),
        },
        notification: {
          type: 'success',
          message: `✅ Procesados ${records.length} registro(s) con las opciones seleccionadas`
        }
      };
    } catch (error: any) {
      console.error('[Example with UI] Error:', error);
      return {
        success: false,
        message: 'Error ejecutando la acción',
        error: error.message || 'Error desconocido',
        notification: {
          type: 'error',
          message: '❌ Error al ejecutar la acción'
        }
      };
    }
  }
};

// Exportar actions
export const actions: ActionDefinition[] = [
  dummyAction,
  exampleWithUIAction,  // Action con UI de ejemplo
];

export default actions;
