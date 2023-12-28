import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../utils/api';
import './MessageList.css'; // Importa el archivo de estilos

const MessageList = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        if (selectedFriend && storedUsername) {
          const response = await axios.get(`${API_ENDPOINTS.GETALLMESSAGES}/${storedUsername}/${selectedFriend.username}`);
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedFriend]);

  const handleSendMessage = async () => {
    try {
        const storedUsername = localStorage.getItem('username');
        if (selectedFriend && storedUsername && newMessageContent.trim() !== '') {
          const response = await axios.post(`${API_ENDPOINTS.CREATEMESSAGE}`, {
            senderUsername: storedUsername,
            receiverUsername: selectedFriend.username,
            content: newMessageContent.trim(),
          });
    
          if (response.data.message && response.data.message.timestamp) {
            // Actualiza la lista de mensajes después de enviar uno nuevo
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
    
            // Limpia el campo de entrada
            setNewMessageContent('');
    
            // Enfoca nuevamente en el campo de entrada
            inputRef.current.focus();
          } else {
            console.error('Error: Invalid message format in the server response');
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
  };

  return (
    <div>
      <h2>Mensajes</h2>
      {selectedFriend ? (
        <div>
          <p>Conversación con: {selectedFriend.username}</p>
          <ul className="message-list">
            {messages.map((message) => (
              <li key={message.timestamp.low} className="message-card">
                <strong>{message.sender}:</strong> {message.content}
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </li>
            ))}
          </ul>
          <div className="message-input">
            <input
              type="text"
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              ref={inputRef}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      ) : (
        <p>Selecciona un amigo para ver los mensajes</p>
      )}
    </div>
  );
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp.low * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export default MessageList;
