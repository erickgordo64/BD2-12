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
  // Agrega más endpoints según sea necesario
};
