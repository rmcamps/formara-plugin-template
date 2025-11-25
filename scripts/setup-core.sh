#!/bin/bash

##
# Script de Setup del Core para Plugins de Formara
# 
# Este script detecta automáticamente si el plugin está en un monorepo
# o standalone, y configura los tipos del core apropiadamente:
# - En monorepo: crea symlink a ../template/core/types (siempre sincronizado)
# - En standalone: descarga desde GitHub
#
# Uso:
#   bash scripts/setup-core.sh
#
# El script se ejecuta automáticamente en postinstall
##

set -e

CORE_DIR="./core"
TEMPLATE_DIR="../template"

echo "🔧 Configurando archivos del core de Formara..."
echo ""

# Crear estructura de directorios
mkdir -p "$CORE_DIR/types"

# Detectar modo de operación
if [ -d "$TEMPLATE_DIR" ]; then
  echo "🔗 Modo monorepo detectado"
  echo "   Creando symlink a $TEMPLATE_DIR/core"
  echo ""
  
  # Eliminar contenido previo si existe
  rm -rf "$CORE_DIR/types" 2>/dev/null || true
  
  # Crear symlink al directorio de tipos
  ln -sf "$TEMPLATE_DIR/core/types" "$CORE_DIR/types"
  
  echo "✅ Tipos vinculados via symlink"
  echo "   → $CORE_DIR/types → $TEMPLATE_DIR/core/types"
  echo ""
  echo "📌 Los archivos están siempre sincronizados con el template"
  
else
  echo "📦 Modo standalone detectado"
  echo "   Descargando archivos desde GitHub..."
  echo ""
  
  # Obtener nombre del plugin del directorio actual
  PLUGIN_NAME=$(basename "$(pwd)")
  
  # Base URL del repo del plugin
  BASE_URL="https://raw.githubusercontent.com/formara/plugin-${PLUGIN_NAME}/main/core"
  
  # Descargar tipos
  echo "📥 Descargando tipos..."
  curl -sf "$BASE_URL/types/plugin-contracts.ts" -o "$CORE_DIR/types/plugin-contracts.ts" 2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "   ✅ plugin-contracts.ts"
  else
    echo "   ⚠️  No se pudo descargar plugin-contracts.ts (usando versión local si existe)"
  fi
  
  curl -sf "$BASE_URL/types/plugin-backend-contracts.ts" -o "$CORE_DIR/types/plugin-backend-contracts.ts" 2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "   ✅ plugin-backend-contracts.ts"
  else
    echo "   ⚠️  No se pudo descargar plugin-backend-contracts.ts"
  fi
  
  echo ""
  echo "✅ Archivos descargados"
  echo ""
  echo "📌 Para actualizar, ejecutá: npm run setup:core"
fi

echo ""
echo "🎉 Setup completo!"
