import { Link } from "react-router-dom";

export default function Form() {

  return (

    <div className="sm:card realtive flex flex-col bg-transparent py-2">


      <div className="mt-0">
        <div className="mb-8 flex flex-col flex-shrink-0">

          <Link to="/cacharreria_cosas_bonitas/"
          >
            <img
              src="../src/assets/logo_horizontal.svg"
              alt="logo"
              className=" p-2 md:block flex-shrink-0"
            />
          </Link>

        </div>
        <div>
          <label className="text-lf font-medium">Correo</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 my-1 bg-transparent"
            placeholder="Ingrese su correo"
          />
        </div>
        <div>
          <label className="text-lf font-medium">Contraseña</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-2">

          <button className=" font-medium pl-4 text-base text-romTurquoise-600">
            Olvidaste tu contraseña
          </button>

          <button className=" active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
            Iniciar Sesión
          </button>

        </div>
        <div className="mt-2 flex justify-center items-center">
          <p className="font-medium text-base">No tienes una cuenta</p>

          <Link to="/cacharreria_cosas_bonitas/Register/"
            className="ml-2 font-medium text-base text-romTurquoise-600">
            Regístrate
          </Link>


        </div>
      </div>
    </div>
  );
}