// api.js
const BASE_URL = 'http://localhost:4000';

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  USER_PROFILE: `${BASE_URL}/profile`,
  REGISTER: `${BASE_URL}/register`,
  SEARCHFRIENDBYSPECIALITY: `${BASE_URL}/search-professionals-by-specialty`,
  SEARCHFRIENDBYNAME: `${BASE_URL}/search-professionals-by-name`,
  COMMONFRIENDS: `${BASE_URL}/common-friends`,
  ADDFRIEND: `${BASE_URL}/add-friend`,
  GETFRIENDS:`${BASE_URL}/get-friends`,
  REMOVEFRIEND:`${BASE_URL}/remove-friend`,
  GETUSERPOSTS:`${BASE_URL}/get-user-posts`,
  GETALLMESSAGES:`${BASE_URL}/get-all-messages`,
  CREATEMESSAGE:`${BASE_URL}/create-message`,
  PATIENTBYAGE: `${BASE_URL}/total-pacientes-por-edad`,
  PATIENTBYHABITACION: `${BASE_URL}/cantidad-pacientes-por-habitacion`,
  PATIENTBYGENER: `${BASE_URL}/cantidad-pacientes-por-genero`,
  TOP5MORE: `${BASE_URL}/top5-edades-mas-atendidas`,
  TOP5LESS: `${BASE_URL}/top5-edades-menos-atendidas`,
  // Agrega más endpoints según sea necesario
};
