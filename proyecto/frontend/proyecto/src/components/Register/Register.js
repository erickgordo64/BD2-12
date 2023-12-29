// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/api';
import './style.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [password, setEncryptedPassword] = useState('');
  const [webpage, setWebpage] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!fullName || !username || !email || !age || !specialty || !password) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        fullName,
        username,
        email,
        age,
        specialty,
        password,
        webpage,
        photo,
      });

      if (response.status === 200) {
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

        <label className="label">Nombre completo:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input"
        />

        <label className="label">Página web:</label>
        <input
          type="text"
          value={webpage}
          onChange={(e) => setWebpage(e.target.value)}
          className="input"
        />

        <label className="label">Contraseña cifrada:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setEncryptedPassword(e.target.value)}
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
