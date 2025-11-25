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
 * Action: Dummy Action
 * 
 * Ejemplo de acción que se puede ejecutar desde el contexto de documentos o form-records
 */
const dummyAction: ActionDefinition = {
  id: 'dummy-action',
  pluginName: 'PLUGIN_NAME',
  label: 'Acción Dummy',
  icon: '⚡',
  description: 'Ejemplo de acción para el plugin template',
  contexts: ['document', 'form-record'],
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

// Exportar actions
export const actions: ActionDefinition[] = [
  dummyAction,
];

export default actions;
