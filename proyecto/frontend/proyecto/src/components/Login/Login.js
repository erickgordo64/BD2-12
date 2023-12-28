// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/api';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.status === 200) {
        // Almacena el username en localStorage o en algún estado global
        const username = response.data.username;
        localStorage.setItem('username', username);

        // Redirige al perfil con el username en la URL
        navigate(`/profile/${username}`);
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al realizar la solicitud');
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

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
