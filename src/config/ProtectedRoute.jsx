import React from "react";
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from "../util/context/authentication";

const ProtectedRoute = ({ component: Component }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Component /> : <Navigate to="/login" />
};

export default ProtectedRoute;