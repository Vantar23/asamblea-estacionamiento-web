const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'build')));

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
};

// Crear tabla de asistencias si no existe
async function createTable() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS asistencias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        qr_value VARCHAR(255) NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    console.log('✅ Tabla de asistencias creada/verificada correctamente');
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error creando tabla:', error);
  }
}

// Inicializar tabla al arrancar el servidor
createTable();

// Ruta para obtener el contador de asistencias
app.get('/api/asistencias/count', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as total FROM asistencias WHERE qr_value = ?',
      ['Asamblea de circuito']
    );
    
    await connection.end();
    
    res.json({ count: rows[0].total });
  } catch (error) {
    console.error('Error obteniendo contador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para registrar una nueva asistencia
app.post('/api/asistencias', async (req, res) => {
  try {
    const { qrValue, ipAddress, userAgent } = req.body;
    
    // Validar que el QR sea válido
    if (qrValue !== 'Asamblea de circuito') {
      return res.status(400).json({ error: 'QR no válido' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.execute(
      'INSERT INTO asistencias (qr_value, ip_address, user_agent) VALUES (?, ?, ?)',
      [qrValue, ipAddress, userAgent]
    );
    
    await connection.end();
    
    // Obtener el nuevo contador
    const newConnection = await mysql.createConnection(dbConfig);
    const [countRows] = await newConnection.execute(
      'SELECT COUNT(*) as total FROM asistencias WHERE qr_value = ?',
      ['Asamblea de circuito']
    );
    await newConnection.end();
    
    res.json({ 
      success: true, 
      id: result.insertId,
      count: countRows[0].total 
    });
  } catch (error) {
    console.error('Error registrando asistencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener todas las asistencias (opcional, para administración)
app.get('/api/asistencias', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      'SELECT * FROM asistencias WHERE qr_value = ? ORDER BY created_at DESC',
      ['Asamblea de circuito']
    );
    
    await connection.end();
    
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo asistencias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de prueba simple
app.get('/test', (req, res) => {
  console.log('🧪 Test endpoint solicitado');
  res.status(200).send('Servidor funcionando correctamente');
});

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check solicitado');
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: PORT
  });
});

// Servir el frontend React en Railway
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Manejo de errores del servidor
process.on('uncaughtException', (error) => {
  console.error('❌ Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
  process.exit(1);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend ejecutándose en puerto ${PORT}`);
  console.log(`📊 Base de datos: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
  console.log(`🌐 Aplicación disponible en: http://0.0.0.0:${PORT}`);
  console.log(`🏥 Health check disponible en: http://0.0.0.0:${PORT}/api/health`);
});
