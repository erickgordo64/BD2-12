import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} />
        <Route index element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
