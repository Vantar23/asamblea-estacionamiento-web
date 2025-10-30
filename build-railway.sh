#!/bin/bash

echo "🚀 Iniciando build para Railway..."

# Verificar versión de Node.js
echo "📋 Verificando versión de Node.js..."
node --version
npm --version

# Limpiar cache
echo "🧹 Limpiando cache..."
node clean-cache.js

# Instalar dependencias con --legacy-peer-deps para evitar conflictos
echo "📦 Instalando dependencias..."
npm ci --legacy-peer-deps

# Construir frontend
echo "🔨 Construyendo frontend..."
npm run build

echo "✅ Build completado para Railway"
