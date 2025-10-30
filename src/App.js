import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import './App.css';

function App() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);

  const handleScan = (result) => {
    if (result && result[0] && result[0].rawValue === "Asamblea de circuito") {
      setAttendanceCount(prev => prev + 1);
      setIsScannerOpen(false);
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

        <button className="scan-button" onClick={openScanner}>
          📱 Abrir Scanner QR
        </button>

        <div className="instructions">
          <p>Presiona el botón para abrir el scanner y registrar asistencias</p>
        </div>
      </div>
    </div>
  );
}

export default App;
