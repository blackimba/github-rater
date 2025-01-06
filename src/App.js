import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './module/login/Login';
import Dashboard from './module/dashboard/Dashboard';
import Callback from './module/callback/Callback';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/callback' element={<Callback/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}




export default App;
