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
                    // Redirigir al formulario de cambio de contraseña
                    navigate(`/cacharreria_cosas_bonitas/FormularioCambioContrasena/${token}`, { state: { successMessage: data.msg } });
                } else {
                    navigate('/cacharreria_cosas_bonitas/Login', { state: { errorMessage: (data.msg || 'Error al procesar el cambio de contraseña.' )} });
                }
            } catch (error) {
                navigate('/cacharreria_cosas_bonitas/Login', { state: { errorMessage: (error.msg || 'Error al procesar el cambio de contraseña.' )} });
            }
        };

        if (!isApiCalledRef.current) {
            confirmar();
            isApiCalledRef.current = true;
        }
    }, [navigate, token]);
}

export default CambiarContrasena;
