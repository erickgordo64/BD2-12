// FriendList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';
import './FriendList.css'; // Importa el archivo de estilo

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);
  const [currentUserUsername, setCurrentUserUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setCurrentUserUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.GETFRIENDS}/${currentUserUsername}`);
        setFriendList(response.data.friends);
      } catch (error) {
        console.error('Error al obtener la lista de amigos:', error);
      }
    };

    if (currentUserUsername) {
      getFriendList();
    }
  }, [currentUserUsername]);

  const handleRemoveFriend = async (friendUsername) => {
    try {
      // Lógica para eliminar la amistad
      await axios.post(API_ENDPOINTS.REMOVEFRIEND, {
        currentUserUsername,
        friendUsername,
      });

      // Actualizar la lista de amigos después de eliminar la amistad
      const updatedFriendList = friendList.filter((friend) => friend.username !== friendUsername);
      setFriendList(updatedFriendList);
    } catch (error) {
      console.error('Error al eliminar la amistad:', error);
    }
  };

  return (
    <div className="friend-list-container">
      <h2>Lista de Amigos</h2>
      {friendList.length === 0 ? (
        <p className="empty-message">Aún no tienes amigos.</p>
      ) : (
        <div className="friend-cards-container">
          {friendList.map((friend, index) => (
            <div key={index} className="friend-card">
              <img
                src={friend.photo || 'default-avatar.jpg'}
                alt={`Foto de ${friend.username}`}
                className="friend-photo"
              />
              <p className="friend-username">{friend.username}</p>
              <button onClick={() => handleRemoveFriend(friend.username)}>
                Eliminar Amistad
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;
