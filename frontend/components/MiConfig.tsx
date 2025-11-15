/**
 * Componente de configuración del plugin
 * Este componente aparece cuando el usuario hace click en tu plugin desde /integrations
 */

import React, { useState, useEffect } from 'react';
import { api, useAuth, authHeaders, Input } from '@formara/plugin-sdk/frontend';

interface MiConfigProps {
  workspaceId: number;
  onClose?: () => void;
}

export default function MiConfig({ workspaceId, onClose }: MiConfigProps) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);
  const [mensaje, setMensaje] = useState('');

  // Cargar configuración al montar
  useEffect(() => {
    loadConfig();
  }, [workspaceId, token]);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        api(`/api/plugins/mi-plugin/config?workspaceId=${workspaceId}`),
        { headers: authHeaders(token!) }
      );
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch(api('/api/plugins/mi-plugin/config'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(token!)
        },
        body: JSON.stringify({
          workspaceId,
          mensaje
        })
      });
      
      alert('Configuración guardada');
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error al guardar');
    }
  };

  if (loading) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Configuración de Mi Plugin</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Configura tu plugin aquí. Este es un ejemplo básico.
        </p>
      </div>

      {config && (
        <div className="mb-4 p-3 bg-blue-50 rounded">
          <p className="text-sm text-blue-800">
            ✓ Plugin conectado correctamente
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Workspace ID: {workspaceId}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Mensaje de prueba
          </label>
          <Input
            value={mensaje}
            onChange={(e: any) => setMensaje(e.target.value)}
            placeholder="Escribe algo..."
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Guardar
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


