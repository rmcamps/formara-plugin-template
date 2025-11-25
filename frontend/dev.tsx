/**
 * Dev Environment para Plugin Template
 */

import { createRoot } from 'react-dom/client';
import '@formara/plugin-sdk/sdk-styles.css';
import './dev-style.css';
import { DevApp } from '@formara/plugin-sdk/sandbox/frontend';
import { processMockups } from '@formara/plugin-sdk/sandbox/frontend/mockup-loader';
import manifest from '../manifest.json';
import { fieldTypes, cards } from './index';

const BACKEND_URL = ((import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:4002') as string;

// Cargar mockups dinámicamente
const mockupModules = import.meta.glob('./mockups/*.json', { eager: true }) as Record<string, { default: any }>;
const mockups = processMockups(mockupModules);

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
      actions={manifest.capabilities?.actions || []}
      hooks={manifest.capabilities?.hooks || []}
      schemas={[]}
      templates={manifest.capabilities?.templates || []}
      cards={cards}
      mockups={mockups}
      backendUrl={BACKEND_URL}
    />
  );
}
