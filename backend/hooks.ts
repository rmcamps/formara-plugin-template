/**
 * HOOKS del Plugin Template
 * 
 * Ejemplos de hooks que responden a eventos del sistema
 */

import type {
  HookDefinition,
  HookResult,
  FileEventData,
  FormRecordEventData,
} from '@formara/plugin-sdk/contracts/backend';

/**
 * Hook: Procesar archivo cuando se procesa con IA
 * Ejemplo: Loggear información del archivo procesado
 */
async function onFileProcessed(data: FileEventData): Promise<HookResult> {
  const file = data.file;
  
  console.log(`[Template Hook] Archivo procesado: ${file.name} (ID: ${file.id})`);
  
  // Ejemplo: Contar campos extraídos
  let fieldCount = 0;
  if (file.extractedData) {
    const countFields = (obj: any): void => {
      if (!obj || typeof obj !== 'object') return;
      Object.values(obj).forEach((value) => {
        fieldCount++;
        if (typeof value === 'object') {
          countFields(value);
        }
      });
    };
    countFields(file.extractedData);
  }

  return {
    success: true,
    pluginName: 'PLUGIN_NAME',
    hookId: 'dummy-file-processed',
    message: `Archivo ${file.name} procesado con ${fieldCount} campos extraídos`,
    data: {
      fileId: file.id,
      fileName: file.name,
      fieldCount,
      hasExtractedData: !!file.extractedData,
    }
  };
}

/**
 * Hook: Procesar registro cuando se crea
 * Ejemplo: Validar o transformar datos del registro
 */
async function onFormRecordCreated(data: FormRecordEventData): Promise<HookResult> {
  const record = data.record;
  const form = data.form;
  
  console.log(`[Template Hook] Registro creado: Form ID ${form.id}, Record ID ${record.id}`);
  
  // Ejemplo: Contar campos con datos
  const fieldsWithData = Object.entries(record.data)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .length;

  return {
    success: true,
    pluginName: 'PLUGIN_NAME',
    hookId: 'dummy-form-record-created',
    message: `Registro creado con ${fieldsWithData} campos con datos`,
    data: {
      recordId: record.id,
      formId: form.id,
      formName: form.name,
      fieldsWithData,
      totalFields: Object.keys(record.data).length,
    }
  };
}

/**
 * Hook: Procesar registro cuando se actualiza
 * Ejemplo: Detectar cambios en el registro
 */
async function onFormRecordUpdated(data: FormRecordEventData): Promise<HookResult> {
  const record = data.record;
  const previousData = data.previousData || {};
  
  console.log(`[Template Hook] Registro actualizado: Record ID ${record.id}`);
  
  // Ejemplo: Detectar campos que cambiaron
  const changedFields: string[] = [];
  Object.entries(record.data).forEach(([key, value]) => {
    if (previousData[key] !== value) {
      changedFields.push(key);
    }
  });

  return {
    success: true,
    pluginName: 'PLUGIN_NAME',
    hookId: 'dummy-form-record-updated',
    message: `${changedFields.length} campos modificados`,
    data: {
      recordId: record.id,
      formId: record.formId,
      changedFields,
      changedCount: changedFields.length,
    }
  };
}

/**
 * Exportar hooks del plugin Template
 */
export const hooks: Omit<HookDefinition, 'pluginName'>[] = [
  {
    id: 'dummy-file-processed',
    event: 'file.processed',
    description: 'Ejemplo de hook que procesa archivos cuando se procesan con IA',
    priority: 50,
    async: true, // No bloquear el procesamiento
    timeout: 30000, // 30s timeout
    handler: onFileProcessed
  },
  {
    id: 'dummy-form-record-created',
    event: 'form.record.created',
    description: 'Ejemplo de hook que procesa registros cuando se crean',
    priority: 50,
    async: true,
    handler: onFormRecordCreated
  },
  {
    id: 'dummy-form-record-updated',
    event: 'form.record.updated',
    description: 'Ejemplo de hook que procesa registros cuando se actualizan',
    priority: 50,
    async: true,
    handler: onFormRecordUpdated
  }
];

export default hooks;
