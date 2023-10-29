import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ConfirmarRegistro() {
    const { token } = useParams();
    const navigate = useNavigate();
    const isApiCalledRef = useRef(false);

    useEffect(() => {
        const confirmar = async () => {
            try {
                const response = await fetch(`http://localhost:5800/api/usuarios/confirmar/${token}`);
                const data = await response.json();

                if (response.ok) {
                    // Redirigir al perfil 
                    navigate('/cacharreria_cosas_bonitas/Login', { state: { successMessage: data.msg } });
                } else {
                    navigate('/cacharreria_cosas_bonitas/Login', { state: { errorMessage: (data.msg || 'Error al confirmar el registro.')} });
                }
            } catch (error) {
                navigate('/cacharreria_cosas_bonitas/Login', { state: { errorMessage: (error.msg || 'Error al confirmar el registro.')} });
            }
        };

        if (!isApiCalledRef.current) {
            confirmar();
            isApiCalledRef.current = true;
        }
    }, [navigate, token]);
}

export default ConfirmarRegistro;
