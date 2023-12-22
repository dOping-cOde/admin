import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          authenticated ? (
            <Navigate to="/home" />
          ) : (
            <Login setAuthenticated={setAuthenticated} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          authenticated ? (
            <Navigate to="/home" />
          ) : (
            <Signup setAuthenticated={setAuthenticated} />
          )
        }
      />
      <Route
        path="/home"
        element={
          authenticated ? (
            <Home setAuthenticated={setAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;
