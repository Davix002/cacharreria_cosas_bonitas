export default function FormRegister() {

    return (
        <div className="flex flex-col sm:card items-center justify-center py-2 max-w-md mx-auto " >
            <div className="flex items-center space-x-4">
                {/* <div className="flex flex-col p-2">
                    
                    <img src="../src/assets/favicon_cs.svg" alt="Icono" className="w-14 h-14" />
                </div> */}
                <div className="flex flex-col">
                    {/* Títulos */}
                    <h1 className="text-4xl sm:text-5xl  font-semibold mb-2">Crea tu cuenta</h1>
                    <h2 className="text-xl font-semibold mb-2">¡Compra sin filas!</h2>
                    {/* Formulario */}
                    <form className="mt-4">
                        <div>
                            <label className="text-lf font-medium">Nombre Completo</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 my-1 bg-transparent"
                                placeholder="Ingrese su nombre"
                            />
                        </div>
                        <div>
                            <label className="text-lf font-medium">Email</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                                placeholder="Ingrese su email"
                            />
                        </div>
                        <div>
                            <label className="text-lf font-medium">Contraseña</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                                placeholder="Ingrese su contraseña"
                            />
                        </div>
                        <div className="mt-4">
                            <input type="checkbox" id='remember' />
                            <label className="font-medium text base text-romTurquoise-600" htmlFor='remember'> Acepto Términos y Condiciones</label>

                        </div>

                        <div className="mt-8 flex flex-col gap-y-2">
                            <button className=" active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
                                Iniciar Sesión
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

}