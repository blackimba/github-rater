import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './module/login/Login';
import Dashboard from './module/dashboard/Dashboard';
import Callback from './module/callback/Callback';

import ProtectedRoute from './config/ProtectedRoute';
import { AuthProvider } from './util/context/authentication';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/callback' element={<Callback />} />
          <Route path='/dashboard' element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
