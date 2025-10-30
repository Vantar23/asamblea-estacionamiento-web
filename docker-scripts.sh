#!/bin/bash

# Scripts para manejo de Docker

case "$1" in
  "build")
    echo "🐳 Construyendo imagen Docker..."
    docker build -t asamblea-estacionamiento .
    ;;
  "run")
    echo "🚀 Ejecutando contenedor..."
    docker run -p 3000:3000 \
      -e DB_HOST=hopper.proxy.rlwy.net \
      -e DB_PORT=57359 \
      -e DB_USER=root \
      -e DB_PASSWORD=tevNHeDCYyLPwPcjkRQLKaSQbZDiuvIj \
      -e DB_NAME=railway \
      asamblea-estacionamiento
    ;;
  "dev")
    echo "🔧 Ejecutando con docker-compose..."
    docker-compose up --build
    ;;
  "stop")
    echo "⏹️ Deteniendo contenedores..."
    docker-compose down
    ;;
  "clean")
    echo "🧹 Limpiando imágenes y contenedores..."
    docker-compose down
    docker rmi asamblea-estacionamiento 2>/dev/null || true
    docker system prune -f
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    docker-compose logs -f
    ;;
  *)
    echo "Uso: $0 {build|run|dev|stop|clean|logs}"
    echo ""
    echo "Comandos disponibles:"
    echo "  build  - Construir imagen Docker"
    echo "  run    - Ejecutar contenedor directamente"
    echo "  dev    - Ejecutar con docker-compose (recomendado)"
    echo "  stop   - Detener contenedores"
    echo "  clean  - Limpiar imágenes y contenedores"
    echo "  logs   - Ver logs de los contenedores"
    ;;
esac
