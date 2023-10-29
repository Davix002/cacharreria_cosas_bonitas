import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CambiarContrasena() {
    const { token } = useParams();
    const navigate = useNavigate();
    const isApiCalledRef = useRef(false);

    useEffect(() => {
        const confirmar = async () => {
            try {
                const response = await fetch(`http://localhost:5800/api/usuarios/olvide-password/${token}`, { method: "GET" });
                const data = await response.json();

                if (response.ok) {
                    // Redirigir al formulario de cambio de contraseña después de 2 segundos si es exitoso
                    navigate(`/cacharreria_cosas_bonitas/FormularioCambioContrasena/${token}`, { state: { successMessage: data.msg } });
                } else {
                    navigate('/cacharreria_cosas_bonitas/Login', { state: { errorMessage: (data.msg || 'Error al confirmar el registro.' )} });
                }
            } catch (error) {
                navigate('/cacharreria_cosas_bonitas/Login', { state: { errorMessage: (error.msg || 'Error al confirmar el registro.' )} });
            }
        };

        if (!isApiCalledRef.current) {
            confirmar();
            isApiCalledRef.current = true;
        }
    }, [navigate, token]);
}

export default CambiarContrasena;
