// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.USER_PROFILE}/${username}`);
        setUser(response.data);
        setEditedUser(response.data.profile);
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Enviar la actualización al servidor
      const response = await axios.put(`${API_ENDPOINTS.REGISTER}`, editedUser);

      if (response.status === 200) {
        // Actualizar el estado local con los datos actualizados
        //setUser(response.data);
        setIsEditing(false);
        // Activar la recarga de la página
        setReloadPage(true);
      } else {
        console.error('Error al actualizar el perfil:', response.data.message);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  useEffect(() => {
    // Realizar la recarga de la página una vez
    if (reloadPage) {
      window.location.reload();
      // Desactivar la recarga de la página para evitar un bucle infinito
      setReloadPage(false);
    }
  }, [reloadPage]);

  const handleCancelClick = () => {
    // Restaurar los datos originales y salir del modo de edición
    setEditedUser(user.profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    // Actualizar el estado local cuando se editan los campos de entrada
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Página de Perfil</h1>
      {user ? (
        <div className="profile-data">
          <p>
            <span className="profile-label">Nombre de usuario:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                readOnly = {true}
              />
            ) : (
              user.profile.username
            )}
          </p>
          <p>
            <span className="profile-label">Email:</span>{' '}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            ) : (
              user.profile.email
            )}
          </p>
          <p>
            <span className="profile-label">Edad:</span>{' '}
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={editedUser.age}
                onChange={handleInputChange}
              />
            ) : (
              user.profile.age
            )}
          </p>
          <p>
            <span className="profile-label">Especialidad:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="specialty"
                value={editedUser.specialty}
                onChange={handleInputChange}
              />
            ) : (
              user.profile.specialty
            )}
          </p>
          <p>
            <span className="profile-label">Foto:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="photoUrl"
                value={editedUser.photoUrl}
                onChange={handleInputChange}
              />
            ) : (
              <img
                src={user.profile.photoUrl}
                alt="Foto de perfil"
                className="profile-photo"
              />
            )}
          </p>
          {isEditing ? (
            <div>
              <button onClick={handleSaveClick} className="profile-action-button">
                Guardar
              </button>
              <button onClick={handleCancelClick} className="profile-action-button">
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={handleEditClick} className="profile-action-button">
              Editar
            </button>
          )}
        </div>
      ) : (
        <p className="loading-message">Cargando...</p>
      )}
    </div>
  );
};

export default ProfilePage;
