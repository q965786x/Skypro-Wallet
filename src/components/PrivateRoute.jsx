import React, { children } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token, loading } = useAuth();
    
    if (loading) {
        return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            Загрузка...
        </div>
        );
    }

    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default PrivateRoute;