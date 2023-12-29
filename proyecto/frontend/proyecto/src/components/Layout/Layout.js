// Layout.js
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUsername } from '../../services/AuthService';
import './style.css';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirigir a la página de inicio de sesión
    navigate('/');
  };

  return (
    <div className="layout-container">
      <nav className="nav-bar">
        <ul className="nav-list">
          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={`/profile/${getUsername()}`} className="nav-link">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to={"/search"} className="nav-link">Agregar Amigos</Link>
              </li>
              <li className="nav-item">
                <Link to={"/friendlist"} className="nav-link">Mis Amigos</Link>
              </li>
              <li className="nav-item">
                <Link to={"/viewpost"} className="nav-link">Publicaciones</Link>
              </li>
              <li className="nav-item">
                <Link to={"/viewmessages"} className="nav-link">Mensajes</Link>
              </li>
              <li className="nav-item">
                <Link to={"/consultas"} className="nav-link">Consulta Pacientes</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated() && (
            <li className="nav-item">
              <Link to="/" className="nav-link">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
