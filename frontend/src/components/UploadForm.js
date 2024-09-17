// frontend/src/components/UploadForm.js
import React, { useState } from 'react';

const UploadForm = ({ vehicleId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');  // Limpiar errores previos
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/upload/${vehicleId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail);  // Mostrar mensaje de error desde el backend
      } else {
        const data = await response.json();
        onUpload(data);
      }
    } catch (err) {
      setError('Error al subir el archivo. Inténtalo nuevamente.');
    }
  };

  return (
    <div>
      <h3>Subir Archivo</h3>
      {error && <p className="error">{error}</p>}  {/* Mostrar mensaje de error */}
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
};

export default UploadForm;

