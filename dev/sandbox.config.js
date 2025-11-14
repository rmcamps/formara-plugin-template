/**
 * Configuración del sandbox para desarrollo
 */

module.exports = {
  plugin: {
    name: 'mi-plugin',
    displayName: 'Mi Plugin',
    description: 'Descripción de tu plugin',
    integration: {
      id: 'mi-plugin',
      displayName: 'Mi Plugin',
      icon: '🔌',
      configComponent: null // Se carga dinámicamente
    },
    fieldTypes: [] // Agrega tus field types aquí si los defines
  },
  backend: {
    routes: require('../backend/routes').default,
    basePath: '/api/plugins/mi-plugin',
    port: 3001
  },
  frontend: {
    port: 5174
  }
};

