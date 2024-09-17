import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import VehicleForm from '../components/VehicleForm';
import UploadForm from '../components/UploadForm';
import '../styles/App.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8000/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = async (vehicleData) => {
    const token = localStorage.getItem('token');
    const url = selectedVehicle
      ? `http://localhost:8000/vehicles/${selectedVehicle.id}`
      : "http://localhost:8000/vehicles/create";
    const method = selectedVehicle ? "PUT" : "POST";
    
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleData),
    });

    const updatedVehicle = await response.json();
    if (selectedVehicle) {
      setVehicles(
        vehicles.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
      );
    } else {
      setVehicles([...vehicles, updatedVehicle]);
    }

    setSelectedVehicle(null);
    setShowForm(false);
    setMessage('Vehículo guardado exitosamente.');
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/vehicles/${vehicleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setVehicles(vehicles.filter((v) => v.id !== vehicleId));
      setMessage('Vehículo eliminado exitosamente.');
    }
  };

  const handleUpload = (data) => {
    console.log("Archivo subido:", data);
    setShowUploadForm(false);
    setMessage('Archivo subido exitosamente.');
  };

  return (
    <div>
      <Navbar />
      <div className="vehicles-container">
        <h1>Gestión de Vehículos</h1>
        {message && <p className="success-message">{message}</p>}
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Agregar Vehículo'}
        </button>
        {showForm && (
          <VehicleForm
            onSubmit={handleAddVehicle}
            initialData={selectedVehicle}
          />
        )}
        {showUploadForm && (
          <UploadForm vehicleId={selectedVehicle?.id} onUpload={handleUpload} />
        )}
        <table>
          <thead>
            <tr>
              <th>Número de Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Fecha de Ingreso</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.plate_number}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.entry_date}</td>
                <td>{vehicle.status}</td>
                <td>
                  <button onClick={() => handleEditVehicle(vehicle)}>
                    Editar
                  </button>
                  <button onClick={() => setShowUploadForm(true)}>
                    Subir Archivo
                  </button>
                  <button onClick={() => handleDeleteVehicle(vehicle.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicles;

