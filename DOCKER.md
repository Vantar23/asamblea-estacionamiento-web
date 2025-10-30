# 🐳 Docker Setup - Asamblea de Estacionamiento

Configuración completa de Docker para la aplicación de scanner QR.

## 🚀 Comandos Rápidos

### Desarrollo Local
```bash
# Ejecutar con docker-compose (recomendado)
npm run docker:dev

# O usar docker-compose directamente
docker-compose up --build
```

### Comandos Individuales
```bash
# Construir imagen
npm run docker:build

# Ejecutar contenedor
npm run docker:run

# Ver logs
npm run docker:logs

# Detener contenedores
npm run docker:stop

# Limpiar todo
npm run docker:clean
```

## 📋 Archivos Docker

- **`Dockerfile`** - Imagen principal para desarrollo
- **`Dockerfile.railway`** - Imagen optimizada para Railway
- **`docker-compose.yml`** - Orquestación de servicios
- **`.dockerignore`** - Archivos excluidos del build
- **`docker-scripts.sh`** - Scripts de utilidad

## 🔧 Configuración

### Variables de Entorno
```bash
NODE_ENV=production
PORT=3000
DB_HOST=hopper.proxy.rlwy.net
DB_PORT=57359
DB_USER=root
DB_PASSWORD=tevNHeDCYyLPwPcjkRQLKaSQbZDiuvIj
DB_NAME=railway
```

### Puertos
- **3000** - Aplicación principal (frontend + backend)

## 🚂 Deployment en Railway

Railway usará automáticamente `Dockerfile.railway` para:
1. **Build** - Construir imagen con Node.js 20
2. **Deploy** - Ejecutar aplicación en contenedor
3. **Health Check** - Verificar `/api/health`

## 🛠️ Desarrollo

### Estructura del Proyecto
```
/app
├── src/           # Código fuente React
├── server.js      # Servidor Express
├── package.json   # Dependencias
├── Dockerfile     # Imagen de desarrollo
└── build/         # Frontend construido
```

### Flujo de Desarrollo
1. **Modificar código** en `src/`
2. **Rebuild** con `npm run docker:dev`
3. **Ver cambios** en `http://localhost:3000`

## 🔍 Troubleshooting

### Problemas Comunes
```bash
# Limpiar todo y empezar de nuevo
npm run docker:clean
npm run docker:dev

# Ver logs detallados
docker-compose logs -f

# Entrar al contenedor
docker-compose exec app sh
```

### Verificar Estado
```bash
# Ver contenedores activos
docker ps

# Ver imágenes
docker images

# Ver logs
docker-compose logs
```

## 📱 URLs

- **Aplicación**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **API Asistencias**: http://localhost:3000/api/asistencias

¡Listo para desarrollo con Docker! 🎉
