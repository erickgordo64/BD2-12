// PostView.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/api';
import './PostView.css'; // Importa el archivo de estilo

// Configuración de Axios con interceptor
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');

  if (username) {
    config.headers['Authorization'] = `Bearer ${username}`;
  }

  return config;
});

const PostView = () => {
  const [userPosts, setUserPosts] = useState([]);
  const storedUsername = localStorage.getItem('username');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.GETUSERPOSTS}/${storedUsername}`);
        setUserPosts(response.data.userPosts);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchPosts();
  }, [storedUsername]);

  return (
    <div className="post-view-container">
      <h2>Posts de {storedUsername}</h2>
      {userPosts.length === 0 ? (
        <p className="empty-message">Aún no hay posts.</p>
      ) : (
        <ul className="post-list">
          {userPosts.map((userPost, index) => (
            <li key={index} className="post-item">
              <h3>{userPost.username}</h3>
              {userPost.posts.length === 0 ? (
                <p>No hay posts.</p>
              ) : (
                <ul>
                  {userPost.posts
                    .filter((post) => post.content) // Filtra los posts con contenido no vacío
                    .map((post, postIndex) => (
                      <li key={postIndex} className="post-card">
                        <p className="post-content">{post.content}</p>
                        <p className="timestamp">Fecha de publicación: {new Date(post.timestamp.low).toLocaleString()}</p>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostView;
