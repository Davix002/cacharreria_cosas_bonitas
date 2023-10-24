import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CambiarContrasena() {
    const { token } = useParams();
    const navigate = useNavigate();
    const isApiCalledRef = useRef(false);
    const [mensaje, setMensaje] = useState('Confirmando tu registro...');

    useEffect(() => {
        const confirmar = async () => {
            try {
                const response = await fetch(`http://localhost:5800/api/usuarios/olvide-password/${token}`, { method: "GET" });
                const data = await response.json();

                if (response.ok) {
                    setMensaje(data.msg);

                    // Redirigir al perfil después de 2 segundos si es exitoso
                    setTimeout(() => {
                        navigate(`/cacharreria_cosas_bonitas/FormularioCambioContrasena/${token}`);
                    }, 2000);
                } else {
                    setMensaje(data.msg || 'Error al confirmar el registro.');

                    // Dar más tiempo al usuario para leer el mensaje de error
                    setTimeout(() => {
                        navigate('/cacharreria_cosas_bonitas/Login', { state: { token } });
                    }, 5000);
                }
            } catch (error) {
                setMensaje('Error al confirmar el registro.');
                console.error('Error al confirmar:', error);
            }
        };

        if (!isApiCalledRef.current) {
            confirmar();
            isApiCalledRef.current = true;
        }
    }, [navigate, token]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p>{mensaje}</p>
        </div>
    );
}

export default CambiarContrasena;
