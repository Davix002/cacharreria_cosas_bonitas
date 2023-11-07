import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const initialIsLogueado = Boolean(localStorage.getItem("token"));
  const initialRole = localStorage.getItem("role");

  const [isLogueado, setIsLogueado] = useState(initialIsLogueado);
  const [role, setRole] = useState(initialRole);
  const [usuario, setUsuario] = useState(null);

  const logIn = useCallback((token, userRole, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsLogueado(true);
    setRole(userRole);
    setUsuario(user);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLogueado(false);
    setRole(null);
    setUsuario(null);
  }, []);

  useEffect(() => {
    const obtenerPerfil = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:5800/api/usuarios/perfil`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 401) {
            logOut();
            return;
          }

          const data = await response.json();
          logIn(token, data.role, data);
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
        }
      }
    };

    obtenerPerfil();
  }, [logIn, logOut]);

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

// Función para actualizar los datos del usuario
const updateUser = async (profileData) => {
    const token = localStorage.getItem("token");
    if (token && usuario) {
      try {
        const response = await fetch(
          `http://localhost:5800/api/usuarios/perfil`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
          }
        );
  
        if (!response.ok) {
          throw new Error("Error al actualizar el perfil");
        }
  
        const updatedUser = await response.json();
        // Actualizar el estado del usuario con los nuevos datos
        setUsuario(updatedUser);
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
      }
    }
  };
  

  const value = {
    isLogueado,
    role,
    usuario,
    logIn,
    logOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
