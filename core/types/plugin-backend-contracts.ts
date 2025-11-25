/**
 * Contratos de Plugin para Formara - Backend
 * 
 * Estas interfaces definen el contrato entre el core de Formara y los plugins del backend.
 * 
 * Versión: 1.0.0
 */

import { Router } from 'express';

/**
 * Contexto de ejecución de una Action
 */
export interface ActionContextData {
  workspaceId: number;
  userId: number;
  documentId?: number;
  formRecordId?: number;
  formId?: number;
  data?: any;
  metadata?: Record<string, any>;
}

/**
 * Resultado de ejecución de una Action
 */
export interface ActionResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  details?: any;
}

/**
 * Definición de una Action de plugin (backend)
 */
export interface ActionDefinition {
  id: string;
  pluginName: string;
  handler: (context: ActionContextData) => Promise<ActionResult>;
}

/**
 * Datos de evento de archivo procesado
 */
export interface FileEventData {
  id: number;
  filename: string;
  workspaceId: number;
  userId?: number;
  extractedData?: any;
  metadata?: Record<string, any>;
}

/**
 * Datos de evento de registro de formulario
 */
export interface FormRecordEventData {
  id: number;
  formId: number;
  workspaceId: number;
  userId?: number;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

/**
 * Contexto de ejecución de un Hook
 */
export interface HookContext {
  workspaceId: number;
  userId?: number;
  data: FileEventData | FormRecordEventData | any;
  metadata?: Record<string, any>;
}

/**
 * Resultado de ejecución de un Hook
 */
export interface HookResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

/**
 * Definición de un Hook de plugin
 */
export interface HookDefinition {
  id: string;
  pluginName: string;
  event: string;
  priority: number;
  handler: (context: HookContext) => Promise<HookResult>;
}

/**
 * Información del plugin (del manifest.json)
 */
export interface PluginManifest {
  name: string;
  version: string;
  displayName: string;
  description: string;
  author: string;
  license: string;
  capabilities: {
    fieldTypes?: any[];
    actions?: any[];
    hooks?: any[];
    templates?: any[];
    integrations?: any[];
  };
  permissions: string[];
  config: {
    required: string[];
    optional: string[];
  };
}

/**
 * Información de plugin cargado
 */
export interface PluginInfo {
  name: string;
  router: Router;
  manifest?: PluginManifest;
  actions?: ActionDefinition[];
  hooks?: HookDefinition[];
  integrations?: any[];
}

/**
 * Request extendido con usuario autenticado
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    workspaceId: number;
    role: string;
  };
}

/**
 * Configuración de integración
 */
export interface IntegrationDefinition {
  id: string;
  pluginName: string;
  displayName: string;
  description: string;
  icon?: string;
  category: string;
  requiresAuth: boolean;
  configComponent?: string;
  capabilities?: {
    sync?: boolean;
    import?: boolean;
    export?: boolean;
    realtime?: boolean;
  };
  hooks?: string[];
  website?: string;
  docsUrl?: string;
}

/**
 * Registry de integraciones
 */
export interface IntegrationRegistry {
  [pluginName: string]: IntegrationDefinition[];
}

