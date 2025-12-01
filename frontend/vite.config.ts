import { defineConfig, type Plugin, type AliasOptions } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { getPluginViteConfig } from '@formara/plugin-sdk/utils/vite-config'
import fs from 'fs'

const resolveCoreAliases: Plugin = {
  name: 'resolve-core-aliases',
  enforce: 'pre',
  resolveId(id, importer) {
    if (id.startsWith('@/')) {
      if (importer?.includes('frontend/src')) {
        const corePath = path.resolve(__dirname, '../../../frontend/src', id.slice(2));
        const possiblePaths = [
          corePath,
          corePath + '.ts',
          corePath + '.tsx',
          corePath + '/index.ts',
          corePath + '/index.tsx',
        ];
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            return possiblePath;
          }
        }
      } else {
        const pluginPath = path.resolve(__dirname, './src', id.slice(2));
        const possiblePaths = [
          pluginPath,
          pluginPath + '.ts',
          pluginPath + '.tsx',
          pluginPath + '/index.ts',
          pluginPath + '/index.tsx',
        ];
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            return possiblePath;
          }
        }
      }
    }
    return null;
  },
};

export default defineConfig({
  plugins: [react(), resolveCoreAliases],
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, '../../../frontend/src'),
      ...(getPluginViteConfig(__dirname).resolve?.alias as Record<string, string> || {}),
    } as AliasOptions,
  },
  server: {
    port: 4001,
    strictPort: true, // No cambiar de puerto si está ocupado, mostrar error
    open: '/dev.html',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'dev.html'),
      },
    },
  },
})
