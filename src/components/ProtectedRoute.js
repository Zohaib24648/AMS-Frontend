import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
