import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/UseAuth";

function Perfil() {
    const navigate = useNavigate();
    const { logOut, usuario, updateUser } = useAuth();
    const [profile, setProfile] = useState({
        address: '',
        postalCode: '',
        phone: '',
        creditCardNumber: '',
    });



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/cacharreria_cosas_bonitas/Login/');
        }

        if (usuario) {
            setProfile({
                address: usuario.address || '',
                postalCode: usuario.postalCode || '',
                phone: usuario.phone || '',
                creditCardNumber: usuario.creditCardNumber || '',
            });
        }
    }, [navigate, usuario]);

    const cerrarSesion = () => {
        logOut();
        navigate('/cacharreria_cosas_bonitas/Login/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(profile);
    };

    if (!usuario) {
        return <div className="flex items-center justify-center h-screen">Cargando perfil...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg mb-4" onSubmit={handleSubmit}>
                <h1 className="text-4xl sm:text-5xl font-semibold text-center">Perfil</h1>
                <div className="mt-4">
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Dirección"
                        className="my-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        value={profile.postalCode}
                        onChange={handleChange}
                        placeholder="Código Postal"
                        className="my-2 p-2 border rounded"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        className="my-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="creditCardNumber"
                        value={profile.creditCardNumber}
                        onChange={handleChange}
                        placeholder="Número de Tarjeta de Crédito"
                        className="my-2 p-2 border rounded"
                    />
                    <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Guardar Cambios
                    </button>
                </div>
            </form>
            <button onClick={cerrarSesion}
            className=" active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out px-4 py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
            >Cerrar Sesión</button>
        </div>
    );
}

export default Perfil;
