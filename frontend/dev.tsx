/**
 * Dev Environment para Plugin Template
 * 
 * Este es un plugin de ejemplo que muestra cómo crear un nuevo plugin
 * Usa el DevApp del SDK con todas las funcionalidades
 */

import { createRoot } from 'react-dom/client';
import './dev-style.css';
import { DevApp } from '@formara/plugin-sdk/sandbox/frontend';
import manifest from '../manifest.json';

// Backend URL del plugin
const BACKEND_URL = ((import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:4001') as string;

// Cargar mockups dinámicamente desde ./src/mockups/*.json
const mockupModules = import.meta.glob('./src/mockups/*.json', { eager: true }) as Record<string, { default: any }>;
const mockups: Record<string, { label: string; data: any }> = {};
for (const [path, module] of Object.entries(mockupModules)) {
  const fileName = path.split('/').pop()?.replace('.json', '') || '';
  const label = fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  mockups[fileName] = { label, data: module.default };
}

// Field Types disponibles (ejemplo - reemplazar con tus propios field types)
const fieldTypes: any[] = [];

// Componentes de configuración de integrations (ejemplo - reemplazar con tus propios)
const integrationComponents: Record<string, React.ComponentType<any>> = {};

// Mount the app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <DevApp
      pluginName={manifest.name}
      displayName={manifest.displayName}
      version={manifest.version}
      description={manifest.description}
      fieldTypes={fieldTypes}
      actions={manifest.capabilities.actions || []}
      integrations={manifest.capabilities.integrations || []}
      mockups={mockups}
      backendUrl={BACKEND_URL}
      integrationComponents={integrationComponents}
    />
  );
}
