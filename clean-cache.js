#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log('✅ Cache limpiado exitosamente');
    } catch (error) {
      console.log('⚠️  No se pudo limpiar el cache, pero continuando...');
    }
  }
}

// Limpiar cache de babel-loader
const cachePath = path.join(__dirname, 'node_modules', '.cache');
removeDir(cachePath);

// Limpiar cache de npm
const npmCachePath = path.join(__dirname, '.npm');
removeDir(npmCachePath);
