import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import './App.css';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

function App() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar contador inicial al montar el componente
  useEffect(() => {
    loadAttendanceCount();
  }, []);

  const loadAttendanceCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/asistencias/count`);
      const data = await response.json();
      setAttendanceCount(data.count);
    } catch (error) {
      console.error('Error cargando contador:', error);
    }
  };

  const registerAttendance = async (qrValue) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/api/asistencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qrValue: qrValue,
          ipAddress: await getClientIP(),
          userAgent: navigator.userAgent
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setAttendanceCount(data.count);
        return true;
      } else {
        console.error('Error registrando asistencia:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error registrando asistencia:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const handleScan = async (result) => {
    if (result && result[0] && result[0].rawValue === "Asamblea de circuito") {
      const success = await registerAttendance(result[0].rawValue);
      if (success) {
        setIsScannerOpen(false);
      }
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR:', error);
  };

  const openScanner = () => {
    setIsScannerOpen(true);
  };

  const closeScanner = () => {
    setIsScannerOpen(false);
  };

  if (isScannerOpen) {
    return (
      <div className="scanner-container">
        <div className="scanner-header">
          <button className="close-button" onClick={closeScanner}>
            ✕ Cerrar
          </button>
        </div>
        <div className="scanner-content">
          <Scanner
            onScan={handleScan}
            onError={handleError}
            constraints={{
              video: {
                facingMode: 'environment'
              }
            }}
            styles={{
              container: {
                width: '100%',
                height: '100%'
              }
            }}
          />
        </div>
        <div className="scanner-instructions">
          <p>Escanea el código QR de "Asamblea de circuito"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="main-container">
        <h1 className="app-title">Asamblea de Estacionamiento</h1>
        
        <div className="attendance-section">
          <h2 className="attendance-title">Asistencias Registradas</h2>
          <div className="attendance-counter">
            <span className="counter-number">{attendanceCount}</span>
            <span className="counter-label">asistencias</span>
          </div>
        </div>

        <button 
          className="scan-button" 
          onClick={openScanner}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Procesando...' : '📱 Abrir Scanner QR'}
        </button>

        <div className="instructions">
          <p>Presiona el botón para abrir el scanner y registrar asistencias</p>
        </div>
      </div>
    </div>
  );
}

export default App;
