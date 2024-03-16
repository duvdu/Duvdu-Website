import React, { useState } from 'react';


const QRScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = error => {
    console.error(error);
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {result && <p>QR Code Result: {result}</p>}
    </div>
  );
}

export default QRScanner;
