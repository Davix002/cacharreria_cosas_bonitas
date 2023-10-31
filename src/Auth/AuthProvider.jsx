import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
    const initialIsLogueado = Boolean(localStorage.getItem("token"));
    const initialRole = localStorage.getItem("role");
    
    const [isLogueado, setIsLogueado] = useState(initialIsLogueado);
    const [role, setRole] = useState(initialRole);
    const [usuario, setUsuario] = useState(null);
    
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            const userRole = localStorage.getItem("role");
            if (token) {
                setIsLogueado(true);
                setRole(userRole);
            } else {
                setIsLogueado(false);
                setRole(null);
            }
        };
        
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

 

    const logIn = (token, userRole, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setIsLogueado(true);
        setRole(userRole);
        setUsuario(user);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLogueado(false);
        setRole(null);
        setUsuario(null);
    };

    const value = {
        isLogueado,
        role,
        usuario,
        logIn,
        logOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
