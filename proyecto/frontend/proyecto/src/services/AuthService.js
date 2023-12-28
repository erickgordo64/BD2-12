// AuthService.js - Archivo para manejar la autenticación
const TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'username';

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY)
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  // Puedes implementar la lógica para verificar la validez y expiración del token aquí
  return !!token; // Devuelve true si hay un token, false si no lo hay
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUsername = () => {
    return localStorage.getItem(USERNAME_KEY);
  };