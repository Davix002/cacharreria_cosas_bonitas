import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/UseAuth";

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const cerrarSesion = () => {
        logOut();
        navigate('/cacharreria_cosas_bonitas/Login/');
    };

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {

                // Obtener el token del localStorage
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/cacharreria_cosas_bonitas/Login/');
                    return;
                }

                // Enviar el token en el encabezado Authorization
                const response = await fetch(`http://localhost:5800/api/usuarios/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    navigate('/cacharreria_cosas_bonitas/Login/');
                    return;
                }   

                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                setError("Error al obtener el perfil del usuario.");
                console.error('Error al obtener el perfil:', error);
            }
        };

        obtenerPerfil();
    }, [navigate]);

    if (error) {
        return <div className="flex items-center justify-center h-screen">{error}</div>;
    }

    if (!usuario) {
        return <div className="flex items-center justify-center h-screen">Cargando perfil...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg mb-4">
                <h1 className="text-4xl sm:text-5xl font-semibold text-center">Perfil</h1>
                <div className="mt-4">
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    {/* Añade más campos según lo que quieras mostrar */}
                </div>
            </div>
            <button onClick={cerrarSesion}
            className=" active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out px-4 py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
            >Cerrar Sesión</button>
        </div>
    );
    
}

export default Perfil;