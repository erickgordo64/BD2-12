// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Utiliza Axios para realizar la solicitud al endpoint de inicio de sesión
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
    <div>
      <h2>Iniciar Sesión</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
