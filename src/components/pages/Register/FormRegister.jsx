import React from "react";
import { Link } from "react-router-dom";

export default function FormRegister() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-semibold  text-center">
                        Crea tu cuenta
                    </h1>
                    <h2 className="text-xl font-semibold text-center">
                        ¡Compra sin filas!
                    </h2>
                    <form className="w-full">
                        {/* Campos del formulario */}
                        <div className="mb-4">
                            <label className="block text-lf font-medium mb-1">Nombre Completo</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
                                placeholder="Ingrese su nombre"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lf font-medium mb-1">Email</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
                                placeholder="Ingrese su email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lf font-medium mb-1">Contraseña</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
                                placeholder="Ingrese su contraseña"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="font-medium text-romTurquoise-600">
                                Acepto Términos y Condiciones
                            </label>
                        </div>
                        <div className="mt-4 flex flex-col gap-y-2">
                            <button className="active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className="mt-4  flex items-center justify-center">
                            
                            <p className="font-medium text-base">¿Ya tienes una cuenta?</p>
                            <Link to="/cacharreria_cosas_bonitas/Login/" className="ml-2 font-medium text-base text-romTurquoise-600">
                                Inicia Sesión
                            </Link>
                        </div>
                        <div className="mt-2  flex items-center justify-center">
                        <Link to="/cacharreria_cosas_bonitas/" className="ml-2 font-medium text-base text-romTurquoise-600">
                                Volver
                            </Link>
                        </div>


                    </form>
                </div>
               
            </div>

           

        </div>
    );
}
