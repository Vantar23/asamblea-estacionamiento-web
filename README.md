# Asamblea de Estacionamiento - Scanner QR

Aplicación móvil para registrar asistencias mediante código QR en asambleas de estacionamiento.

## Características

- 📱 **Diseño móvil optimizado**: Interfaz responsive diseñada específicamente para dispositivos móviles
- 🔍 **Scanner QR a pantalla completa**: Cámara en modo pantalla completa para mejor experiencia de escaneo
- ✅ **Detección automática**: Solo acepta códigos QR con el valor "Asamblea de circuito"
- 📊 **Contador de asistencias**: Registro automático y visualización del número de asistencias
- 🚪 **Salida fácil**: Botón de cerrar siempre visible para salir del scanner en cualquier momento

## Funcionalidad

1. **Vista Principal**: Muestra un contador de asistencias y un botón para abrir el scanner
2. **Scanner QR**: 
   - Se abre a pantalla completa
   - Usa la cámara trasera del dispositivo
   - Solo acepta códigos QR con el texto "Asamblea de circuito"
   - Se cierra automáticamente al detectar un QR válido
   - Incluye botón de cerrar para salir manualmente

## Instalación y Uso

### Requisitos
- Node.js (versión 14 o superior)
- NPM o Yarn
- Dispositivo móvil con cámara

### Instalación
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### Construir para producción
```bash
npm run build
```

## Uso en Móvil

1. Abre la aplicación en tu navegador móvil
2. Presiona el botón "📱 Abrir Scanner QR"
3. Permite el acceso a la cámara cuando se solicite
4. Apunta la cámara hacia un código QR que contenga el texto "Asamblea de circuito"
5. La aplicación detectará automáticamente el código y cerrará el scanner
6. El contador de asistencias se incrementará automáticamente

## Tecnologías Utilizadas

- **React 19**: Framework principal
- **@yudiel/react-qr-scanner**: Librería para escaneo de códigos QR
- **CSS3**: Estilos responsive y animaciones
- **HTML5**: Estructura semántica optimizada para móvil

## Configuración Móvil

La aplicación incluye configuraciones específicas para dispositivos móviles:
- Viewport optimizado para pantallas táctiles
- Prevención de zoom no deseado
- Soporte para PWA (Progressive Web App)
- Estilos adaptativos para diferentes tamaños de pantalla

## Notas de Desarrollo

- La aplicación está optimizada para dispositivos móviles
- Requiere acceso a la cámara del dispositivo
- Funciona mejor en navegadores modernos con soporte para WebRTC
- El contador se reinicia al recargar la página (no persiste datos)