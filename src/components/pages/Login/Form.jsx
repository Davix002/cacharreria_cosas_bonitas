import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/UseAuth";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessageFromRoute = location.state?.errorMessage;
  const [errorMessage, setErrorMessage] = useState(errorMessageFromRoute || "");
  const successMessageFromRoute = location.state?.successMessage;
  const [successMessage, setSuccessMessage] = useState(successMessageFromRoute || "");
  const { logIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5800/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        logIn(data.token, data.role, { email: data.email, nombre: data.nombre, _id: data._id, role: data.role });
        navigate("/cacharreria_cosas_bonitas/perfil");
    } else {
      setErrorMessage(data.msg || "Error al iniciar sesión");
    }    
    } catch (err) {
      setErrorMessage("Error al iniciar sesión. Intente de nuevo.");
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className="sm:card realtive flex flex-col bg-transparent py-2">
      <div className="mt-0">
        <div className="mb-8 flex flex-col flex-shrink-0">
          <Link to="/cacharreria_cosas_bonitas/">
            <img
              src="../src/assets/logo_horizontal.svg"
              alt="logo"
              className=" p-2 md:block flex-shrink-0"
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-lf font-medium">Correo</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-2 my-1 bg-transparent"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-lf font-medium">Contraseña</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
              placeholder="Ingrese su contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {errorMessage ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-4 text-center">
                {errorMessage}
              </div>
            ) : (
              successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mt-4 text-center">
                  {successMessage}
                </div>
              )
            )}
          <div className="mt-4 flex flex-col gap-y-2">
            <Link to="/cacharreria_cosas_bonitas/CambioContrasena/">

              <button className=" font-medium pl-4 text-base text-romTurquoise-600">
                Olvidaste tu contraseña
              </button>
            </Link>


            <button type="submit" className=" active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
              Iniciar Sesión
            </button>
          </div>
          <div className="mt-2 flex justify-center items-center">
            <p className="font-medium text-base">No tienes una cuenta</p>

            <Link
              to="/cacharreria_cosas_bonitas/Register/"
              className="ml-2 font-medium text-base text-romTurquoise-600"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
