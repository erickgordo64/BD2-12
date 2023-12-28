import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login'
import ProfilePage from './components/Profile/ProfilePage';
import Home from './pages/Home'
import Register from './components/Register/Register';
import AddFriends from './components/AddFriend/AddFriends'
import FriendList from './components/FriendsList/FriendsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<AddFriends />} />
          <Route path="/friendlist" element={<FriendList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
