// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';
import './style.css'; // Importa el archivo de estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Iniciar Sesión</h2>
      <form className="form">
        <label className="label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <label className="label">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <button type="button" onClick={handleLogin} className="button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
