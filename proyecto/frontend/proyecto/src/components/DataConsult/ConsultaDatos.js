import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';

import './ConsultaDatos.css'; // Archivo CSS para los estilos

const ConsultaDatos = () => {
  const [selectedQuery, setSelectedQuery] = useState(API_ENDPOINTS.PATIENTBYAGE);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(selectedQuery);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedQuery]);

  const handleQueryChange = (event) => {
    setSelectedQuery(event.target.value);
  };

  return (
    <div className="consulta-datos-container">
      <label htmlFor="querySelector">Seleccione una consulta:</label>
      <select id="querySelector" onChange={handleQueryChange} value={selectedQuery}>
        <option value={API_ENDPOINTS.PATIENTBYAGE}>Total Pacientes por Edad</option>
        <option value={API_ENDPOINTS.PATIENTBYHABITACION}>Cantidad Pacientes por Habitación</option>
        <option value={API_ENDPOINTS.PATIENTBYGENER}>Cantidad Pacientes por Género</option>
        <option value={API_ENDPOINTS.TOP5MORE}>Top 5 Edades Más Atendidas</option>
        <option value={API_ENDPOINTS.TOP5LESS}>Top 5 Edades Menos Atendidas</option>
      </select>

      <div className="consulta-datos-result">
        <h2>Resultado de la consulta:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ConsultaDatos;
