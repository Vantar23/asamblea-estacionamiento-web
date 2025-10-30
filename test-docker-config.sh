#!/bin/bash

echo "🧪 Verificando configuración de Docker..."

# Verificar archivos Docker
echo "📋 Verificando archivos Docker:"
echo "✅ Dockerfile: $(test -f Dockerfile && echo "Existe" || echo "❌ No existe")"
echo "✅ Dockerfile.railway: $(test -f Dockerfile.railway && echo "Existe" || echo "❌ No existe")"
echo "✅ docker-compose.yml: $(test -f docker-compose.yml && echo "Existe" || echo "❌ No existe")"
echo "✅ .dockerignore: $(test -f .dockerignore && echo "Existe" || echo "❌ No existe")"

# Verificar scripts
echo ""
echo "📋 Verificando scripts:"
echo "✅ docker-scripts.sh: $(test -f docker-scripts.sh && echo "Existe" || echo "❌ No existe")"
echo "✅ Permisos: $(test -x docker-scripts.sh && echo "Ejecutable" || echo "❌ No ejecutable")"

# Verificar package.json
echo ""
echo "📋 Verificando scripts de npm:"
grep -q "docker:build" package.json && echo "✅ docker:build" || echo "❌ docker:build"
grep -q "docker:run" package.json && echo "✅ docker:run" || echo "❌ docker:run"
grep -q "docker:dev" package.json && echo "✅ docker:dev" || echo "❌ docker:dev"

# Verificar railway.json
echo ""
echo "📋 Verificando configuración de Railway:"
grep -q "DOCKERFILE" railway.json && echo "✅ Railway configurado para Docker" || echo "❌ Railway no configurado"

echo ""
echo "🎉 Configuración de Docker completada!"
echo ""
echo "Para usar Docker:"
echo "1. Inicia Docker Desktop"
echo "2. Ejecuta: npm run docker:dev"
echo "3. Visita: http://localhost:3000"
