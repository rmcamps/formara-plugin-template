import React from 'react';
import { Input, Button, Label } from '@formara/plugin-sdk/ui';

/**
 * Componente de configuración para la integración dummy
 */
export default function DummyIntegrationConfig({ workspaceId }: { workspaceId: number }) {
  const [apiKey, setApiKey] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    // Aquí iría la lógica para guardar la configuración
    console.log('Guardando configuración de integración dummy:', { workspaceId, apiKey });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="api-key">API Key</Label>
        <Input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Ingrese su API key"
          className="mt-1"
        />
      </div>
      <Button onClick={handleSave} disabled={!apiKey || saved}>
        {saved ? '✓ Guardado' : 'Guardar Configuración'}
      </Button>
    </div>
  );
}
