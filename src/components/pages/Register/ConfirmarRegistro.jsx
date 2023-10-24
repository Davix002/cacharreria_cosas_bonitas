import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ConfirmarRegistro() {
    const { token } = useParams();
    const navigate = useNavigate();
    const isApiCalledRef = useRef(false);
    const [mensaje, setMensaje] = useState('Confirmando tu registro...');

    useEffect(() => {
        const confirmar = async () => {
            try {
                const response = await fetch(`http://localhost:5800/api/usuarios/confirmar/${token}`);
                const data = await response.json();

                if (data.msg) {
                    setMensaje(data.msg);

                    // Redirigir al perfil después de 3 segundos
                    setTimeout(() => {
                        navigate('/cacharreria_cosas_bonitas/Login');
                    }, 4000);
                } else {
                    setMensaje('Error al confirmar el registro.');
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

export default ConfirmarRegistro;
