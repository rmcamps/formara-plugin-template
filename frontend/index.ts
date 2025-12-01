import DummyFieldType from './field-types/dummy-field';
import DummyIntegrationConfig from './components/DummyIntegrationConfig';
import DummyGenerateConfig from './components/DummyGenerateConfig';
import DummyDistributeConfig from './components/DummyDistributeConfig';

// Componentes UI de Actions
export { ExampleAction } from './components/ExampleAction';

export const fieldTypes = [DummyFieldType];

/**
 * Cards exportadas por el plugin
 */
export const cards = [
  {
    id: 'dummy-generate',
    location: 'generate' as const,
    displayName: 'Generar Dummy',
    description: 'Ejemplo de generate para el plugin template',
    icon: '📄',
    category: 'document' as const,
    requiresAuth: false,
    configComponent: DummyGenerateConfig,
    capabilities: {
      sync: false,
      import: false,
      export: false,
      realtime: false
    },
    website: '',
    docsUrl: '',
    embedRoutes: [],
    apiEndpoints: []
  },
  {
    id: 'dummy-distribute',
    location: 'distribute' as const,
    displayName: 'Distribuir Dummy',
    description: 'Ejemplo de distribute para el plugin template',
    icon: '📧',
    category: 'email' as const,
    requiresAuth: false,
    configComponent: DummyDistributeConfig,
    capabilities: {
      sync: false,
      import: false,
      export: false,
      realtime: false
    },
    website: '',
    docsUrl: '',
    embedRoutes: [],
    apiEndpoints: []
  },
  {
    id: 'dummy-automations',
    location: 'automations' as const,
    displayName: 'Automatización Dummy',
    description: 'Ejemplo de automation para el plugin template',
    icon: '⚙️',
    category: 'automation' as const,
    requiresAuth: false,
    configComponent: DummyIntegrationConfig, // Reutilizamos el componente de integración
    capabilities: {
      sync: false,
      import: false,
      export: false,
      realtime: false
    },
    website: '',
    docsUrl: '',
    embedRoutes: [],
    apiEndpoints: []
  },
  {
    id: 'dummy-integration',
    location: 'integrations' as const,
    displayName: 'Integración Dummy',
    description: 'Ejemplo de integración para el plugin template',
    icon: '🔌',
    category: 'other' as const,
    requiresAuth: false,
    configComponent: DummyIntegrationConfig,
    capabilities: {
      sync: false,
      import: false,
      export: false,
      realtime: false
    },
    website: '',
    docsUrl: '',
    embedRoutes: [],
    apiEndpoints: []
  }
];
