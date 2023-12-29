// ProfileFriend.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/api';
import './ProfileFriend.css'; // Importa el archivo de estilos

const ProfileFriend = () => {
  const { username } = useParams();
  const [friendProfile, setFriendProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.USER_PROFILE}/${username}`);
        setFriendProfile(response.data.profile);
      } catch (error) {
        console.error('Error al obtener el perfil del amigo:', error);
        setError('Error al obtener el perfil del amigo. Inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchFriendProfile();
  }, [username]);

  if (loading) {
    return <p className="loading-message">Cargando...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!friendProfile) {
    return <p className="not-found-message">No se encontró el perfil del amigo.</p>;
  }

  return (
    <div className="profile-friend-container">
      <h2>Perfil de {friendProfile.username}</h2>
      <p>Email: {friendProfile.email}</p>
      <p>Edad: {friendProfile.age}</p>
      <p>Especialidad: {friendProfile.specialty}</p>
      {friendProfile.photoUrl && (
        <img
          src={friendProfile.photoUrl}
          alt={`Foto de ${friendProfile.username}`}
          className="friend-photo"
        />
      )}
    </div>
  );
};

export default ProfileFriend;
