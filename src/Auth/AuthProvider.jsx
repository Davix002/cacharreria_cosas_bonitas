import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
    const initialIsLogueado = Boolean(localStorage.getItem("token"));
    const initialRole = localStorage.getItem("role");
    
    const [isLogueado, setIsLogueado] = useState(initialIsLogueado);
    const [role, setRole] = useState(initialRole);
    
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

    const logIn = (token, userRole) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setIsLogueado(true);
        setRole(userRole);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLogueado(false);
    };

    const value = {
        isLogueado,
        role,
        logIn,
        logOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
