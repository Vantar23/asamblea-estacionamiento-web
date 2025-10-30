#!/bin/bash

echo "🚀 Iniciando build para Railway..."

# Limpiar cache
echo "🧹 Limpiando cache..."
node clean-cache.js

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm ci

# Construir frontend
echo "🔨 Construyendo frontend..."
npm run build

echo "✅ Build completado para Railway"
