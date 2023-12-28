// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/api';
import './style.css'; // Asegúrate de usar la ruta correcta para tu archivo de estilos

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(''); // Agregado para el campo de foto
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        username,
        email,
        age,
        specialty,
        password,
        photo, // Incluye el campo de foto en la solicitud
      });

      if (response.status === 200) {
        // Registro exitoso, redirigir a la página de inicio de sesión
        navigate('/');
      } else {
        setError('Error en el registro. Inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Error al realizar la solicitud');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Registro</h2>
      <form className="form">
        <label className="label">Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />

        <label className="label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <label className="label">Edad:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input"
        />

        <label className="label">Especialidad:</label>
        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="input"
        />

        <label className="label">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <label className="label">Foto (URL):</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="input"
        />

        <button type="button" onClick={handleRegister} className="button">
          Registrarse
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
