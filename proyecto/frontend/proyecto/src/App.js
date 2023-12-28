import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* Otras rutas y componentes */}
      </Switch>
    </Router>
  );
}

export default App;
