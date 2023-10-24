import { useState, useEffect } from 'react';

function Perfil() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {

                // Obtener el token del localStorage
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token no encontrado.');
                    return;
                }

                // Enviar el token en el encabezado Authorization
                const response = await fetch(`http://localhost:5800/api/usuarios/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data) {
                    setUsuario(data);
                } else {
                    console.error('Error al obtener el perfil del usuario.');
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        };

        obtenerPerfil();
    }, []);

    if (!usuario) {
        return <div className="flex items-center justify-center h-screen">Cargando perfil...</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-4xl sm:text-5xl font-semibold text-center">Perfil</h1>
                <div className="mt-4">
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    {/* Añade más campos según lo que quieras mostrar */}
                </div>
            </div>
        </div>
    );
}

export default Perfil;