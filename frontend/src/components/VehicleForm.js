// frontend/src/components/VehicleForm.js
import React, { useState, useEffect } from 'react';
import '../styles/App.css'; // Importar estilos

const VehicleForm = ({ onSubmit, initialData }) => {
  const [vehicleData, setVehicleData] = useState({
    plate_number: '',
    brand: '',
    model: '',
    entry_date: '',
    status: 'pending',
    customer_name: '',
    customer_phone: '',
  });

  useEffect(() => {
    if (initialData) {
      setVehicleData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vehicleData);
  };

  return (
    <div className="vehicle-form-container">
      <h2>{initialData ? 'Editar Vehículo' : 'Registrar Vehículo'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Número de Placa:</label>
        <input
          type="text"
          name="plate_number"
          value={vehicleData.plate_number}
          onChange={handleChange}
          required
        />
        <label>Marca:</label>
        <input
          type="text"
          name="brand"
          value={vehicleData.brand}
          onChange={handleChange}
          required
        />
        <label>Modelo:</label>
        <input
          type="text"
          name="model"
          value={vehicleData.model}
          onChange={handleChange}
          required
        />
        <label>Fecha de Ingreso:</label>
        <input
          type="date"
          name="entry_date"
          value={vehicleData.entry_date}
          onChange={handleChange}
          required
        />
        <label>Estado:</label>
        <select name="status" value={vehicleData.status} onChange={handleChange}>
          <option value="pending">Pendiente</option>
          <option value="in_repair">En reparación</option>
          <option value="finished">Terminado</option>
        </select>
        <label>Nombre del Cliente:</label>
        <input
          type="text"
          name="customer_name"
          value={vehicleData.customer_name}
          onChange={handleChange}
          required
        />
        <label>Teléfono del Cliente:</label>
        <input
          type="tel"
          name="customer_phone"
          value={vehicleData.customer_phone}
          onChange={handleChange}
          required
        />
        <button type="submit">{initialData ? 'Actualizar' : 'Registrar'}</button>
      </form>
    </div>
  );
};

export default VehicleForm;

