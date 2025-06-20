// src/components/ProtectedRoute.jsx

import React, { use } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = () => {
  // Check if the user is authenticated
  //const isAuth = isAuthenticated();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);



  // If authenticated, render the child components (the protected page)
  // Otherwise, navigate to the /login page
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;