import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormularioReestablecerContrasena } from "../../../config/api/apiUtils";
import { useNavigate, useParams } from "react-router-dom";

const FormularioCambioContrasena = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessageFromRoute = location.state?.successMessage;
  const [successMessage, setSuccessMessage] = useState(successMessageFromRoute || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordConfirmacion, setPasswordConfirmacion] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (password !== passwordConfirmacion) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    const result = await FormularioReestablecerContrasena(password, token, navigate);
    if (result.success) {
      setSuccessMessage(result.message);
  } else {
      setErrorMessage(result.message);
  }
  };

  return (
    <div className="flex items-start justify-center h-screen p-8">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl sm:text-4xl font-semibold  text-center">
            Reestablecer contraseña
          </h1>
          <p className="text-l text-left ">Ingrese su nueva contraseña</p>
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            <div className="mb-4">
              <label className="block text-lf font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
                placeholder="Ingrese nuevamente su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-lf font-medium mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
                placeholder="Ingrese su contraseña"
                value={passwordConfirmacion}
                onChange={(e) => setPasswordConfirmacion(e.target.value)}
              />
            </div>

            <div className="mt-4 flex flex-col gap-y-2">
              <button
                type="submit"
                className="active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
              >
                Cambiar contraseña
              </button>
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
            <div className="mt-4  flex items-center justify-center">
              <p className="font-medium text-base">
                ¿Recordaste tu antigua contraseña?
              </p>
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
  );
};

export default FormularioCambioContrasena;
