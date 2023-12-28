// FriendSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';
import './FriendSearch.css';

const FriendSearch = () => {
  const [specialty, setSpecialty] = useState('');
  const [name, setName] = useState('');
  const [friendUsername, setFriendUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserUsername, setCurrentUserUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setCurrentUserUsername(storedUsername);
    }
  }, []);

  const handleSearchBySpecialty = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.SEARCHFRIENDBYSPECIALITY}/${specialty}`);
      const filteredResults = response.data.professionals.filter(
        (result) => result['professional.username'] !== currentUserUsername
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching friends by specialty:', error);
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.SEARCHFRIENDBYNAME}/${name}`);
      const filteredResults = response.data.professionals.filter(
        (result) => result['professional.username'] !== currentUserUsername
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching friends by name:', error);
    }
  };

  const handleSearchCommonFriends = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.COMMONFRIENDS}/${currentUserUsername}/${friendUsername}`);
      const filteredResults = response.data.commonFriends.filter(
        (result) => result['professional.username'] !== currentUserUsername
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching common friends:', error);
    }
  };

  const handleAddFriend =async (friendUsername) => {
    try {
        const response = await axios.post(API_ENDPOINTS.ADDFRIEND, {
          currentUserUsername,
          friendUsername,
        });
  
        console.log(response.data);  // Manejar la respuesta del servidor según tus necesidades
  
        // Puedes actualizar la lista de amigos, recargar la página, etc.
      } catch (error) {
        console.error('Error al agregar amigo:', error);
      }
  };

  return (
    <div className="friend-search-container">
      <h2>Buscar Amigos</h2>

      <div className="search-section">
        <label>Especialidad:</label>
        <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        <button onClick={handleSearchBySpecialty}>Buscar por Especialidad</button>
      </div>

      <div className="search-section">
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSearchByName}>Buscar por Nombre</button>
      </div>

      <div className="search-section">
        <label>Usuario del Amigo:</label>
        <input type="text" value={friendUsername} onChange={(e) => setFriendUsername(e.target.value)} />
        <button onClick={handleSearchCommonFriends}>Buscar Amigos en Común</button>
      </div>

      <div className="results-section">
        <h3>Resultados de la Búsqueda</h3>
        <ul className="friend-cards">
          {searchResults.map((result, index) => (
            <li key={index} className="friend-card">
              <p>Usuario: {result['professional.username']}</p>
              <p>Email: {result['professional.email']}</p>
              <p>Edad: {result['professional.age']}</p>
              <p>Especialidad: {result['professional.specialty']}</p>
              <button onClick={() => handleAddFriend(result['professional.username'])}>
                Agregar Amigo
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendSearch;
