// ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_ENDPOINTS} from '../../utils/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.USER_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Página de Perfil</h1>
      {user ? (
        <div>
          <p>
            <strong>Nombre de usuario:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Edad:</strong> {user.age}
          </p>
          <p>
            <strong>Especialidad:</strong> {user.specialty}
          </p>
          <p>
            <strong>Foto:</strong> <img src={user.photo} alt="Foto de perfil" style={{ maxWidth: '200px' }} />
          </p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProfilePage;
