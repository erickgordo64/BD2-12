import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../utils/api';
import './FriendList.css'; // Importa el archivo de estilos

const FriendsList = ({ onFriendSelect }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        const response = await axios.get(`${API_ENDPOINTS.GETFRIENDS}/${storedUsername}`);
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchData();
  }, []);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    onFriendSelect(friend);
  };

  return (
    <div>
      <h2>Lista de Amigos</h2>
      <ul className="friends-list">
        {friends.map((friend) => (
          <li
            key={friend.username}
            onClick={() => handleFriendSelect(friend)}
            className="friend-card"
          >
            <img
              src={friend.photo || 'url de imagen predeterminada si photo es null'}
              alt={friend.username}
              className="friend-avatar"
            />
            <div>
              <strong>{friend.username}</strong>
              {/* Agrega más información si es necesario, como el estado en línea, etc. */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
