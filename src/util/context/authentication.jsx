import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const CLIENT_ID = 'Ov23li0hNgDNMpJfY0No';
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const CLIENT_SECRET = 'e316a254b7e2f9ae9ef8073d4e8f16d4c591c6cd';

    
    const login = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    };

    const fetchAccessToken = async () => {
        const code = new URLSearchParams(window.location.search).get('code');

        console.log("code", code);

        try {
            const response = await axios.post('/login/oauth/access_token', {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
            }, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if(response.data.access_token == undefined) {
                logout();
            }

            localStorage.setItem('accessToken', response.data.access_token);
            setIsAuthenticated(true);
            navigate('/dashboard')
        } catch (error) {
            console.error('Error during authentication process', error);
            setIsAuthenticated(false);
            navigate('/login')
        }
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, fetchAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
