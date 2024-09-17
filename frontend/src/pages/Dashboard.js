// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_vehicles: 0,
    in_repair: 0,
    finished: 0,
    pending: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8000/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Panel de Control del Taller</h1>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Vehículos</h3>
            <p>{stats.total_vehicles}</p>
          </div>
          <div className="stat-card">
            <h3>En Reparación</h3>
            <p>{stats.in_repair}</p>
          </div>
          <div className="stat-card">
            <h3>Finalizados</h3>
            <p>{stats.finished}</p>
          </div>
          <div className="stat-card">
            <h3>Pendientes</h3>
            <p>{stats.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

