import React from 'react';
import { Input, Button, Label } from '@formara/plugin-sdk/ui';

/**
 * Componente de configuración para la distribute dummy
 */
export default function DummyDistributeConfig({ workspaceId }: { workspaceId: number }) {
  const [emailFrom, setEmailFrom] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    // Aquí iría la lógica para guardar la configuración
    console.log('Guardando configuración de distribute dummy:', { workspaceId, emailFrom });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="email-from">Email Remitente</Label>
        <Input
          id="email-from"
          type="email"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
          placeholder="ejemplo@formara.com"
          className="mt-1"
        />
      </div>
      <Button onClick={handleSave} disabled={!emailFrom || saved}>
        {saved ? '✓ Guardado' : 'Guardar Configuración'}
      </Button>
    </div>
  );
}
