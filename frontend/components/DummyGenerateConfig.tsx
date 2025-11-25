import React from 'react';
import { Input, Button, Label } from '@formara/plugin-sdk/ui';

/**
 * Componente de configuración para la generate dummy
 */
export default function DummyGenerateConfig({ workspaceId }: { workspaceId: number }) {
  const [templateName, setTemplateName] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    // Aquí iría la lógica para guardar la configuración
    console.log('Guardando configuración de generate dummy:', { workspaceId, templateName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="template-name">Nombre del Template</Label>
        <Input
          id="template-name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Ej: Factura A"
          className="mt-1"
        />
      </div>
      <Button onClick={handleSave} disabled={!templateName || saved}>
        {saved ? '✓ Guardado' : 'Guardar Configuración'}
      </Button>
    </div>
  );
}
