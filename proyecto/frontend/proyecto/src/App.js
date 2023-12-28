import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}/>
        <Route index element={<Login />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
