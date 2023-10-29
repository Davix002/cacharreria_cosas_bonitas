import { useState } from "react";
import { Link } from "react-router-dom";
import { cambioContrasena } from "../../../config/api/apiUtils";
import { useNavigate } from "react-router-dom";

const SolicitarCambioContrasena = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await cambioContrasena({ email,navigate });
    };

    const [email, setEmail] = useState("");
    return (
        <div className="flex items-start justify-center h-screen p-8">
            
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-4xl sm:text-4xl font-semibold  text-center">
                        Recupera tu contraseña
                    </h1>
                    <p className="text-l text-left ">
                        Se le enviará un token para reestablecer la contraseña 
                    </p>
                    <form className="w-full" onSubmit={handleSubmit}>
                        {/* Campos del formulario */}
                        <div className="mb-4">
                            <label className="block text-lf font-medium mb-1">Email</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
                                placeholder="Ingrese su email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
    
                        <div className="mt-4 flex flex-col gap-y-2">
                            <button
                                type="submit"
                                className="active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
                            >
                                Enviar correo
                            </button>
                        </div>
                        <div className="mt-4  flex items-center justify-center">
                            <p className="font-medium text-base">¿Recordaste tu contraseña?</p>
                            <Link
                                to="/cacharreria_cosas_bonitas/Login/"
                                className="ml-2 font-medium text-base text-romTurquoise-600"
                            >
                                Inicia Sesión
                            </Link>
                        </div>
                        <div className="mt-2  flex items-center justify-center">
                            <Link
                                to="/cacharreria_cosas_bonitas/"
                                className="ml-2 font-medium text-base text-romTurquoise-600"
                            >
                                Volver
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SolicitarCambioContrasena