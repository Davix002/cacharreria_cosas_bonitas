import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [isLogueado, setIsLogueado] = useState(Boolean(localStorage.getItem("token")));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [usuario, setUsuario] = useState(null);

    // Similar para logOut
    const logOut = useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLogueado(false);
      setRole(null);
      setUsuario(null);
    }, []);

  // Esta es una versión memorizada de obtenerPerfil que se re-creará solo si token cambia
  const obtenerPerfil = useCallback(async (token) => {
    try {
      const response = await fetch(`http://localhost:5800/api/usuarios/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logOut();
        return;
      }

      const data = await response.json();
      setUsuario(data); // Actualiza directamente el estado del usuario
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  }, [logOut]);

  // Actualiza el estado al iniciar sesión
  const logIn = useCallback((token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsLogueado(true);
    setRole(userRole);
    obtenerPerfil(token); // Usamos aquí la función memorizada
  }, [obtenerPerfil]);

  useEffect(() => {
    if (isLogueado && !usuario) {
      const token = localStorage.getItem("token");
      if (token) {
        obtenerPerfil(token);
      }
    }
  }, [isLogueado, usuario, obtenerPerfil]);

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
