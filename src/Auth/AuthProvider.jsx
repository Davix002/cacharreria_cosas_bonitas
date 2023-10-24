import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
    const [isLogueado, setIsLogueado] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogueado(true);
        } else {
            setIsLogueado(false);
        }
    }, []);

    const logIn = (token) => {
        localStorage.setItem("token", token);
        setIsLogueado(true);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        setIsLogueado(false);
    };

    const value = {
        isLogueado,
        logIn,
        logOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };