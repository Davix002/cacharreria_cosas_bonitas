import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        localStorage.setItem("token", data.token);
        navigate("/cacharreria_cosas_bonitas/perfil");
    } else {
        setError(data.msg);
    }    
    } catch (err) {
      setError("Error al iniciar sesión. Intente de nuevo más tarde.");
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
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="mt-8 flex flex-col gap-y-2">
            <button className=" font-medium pl-4 text-base text-romTurquoise-600">
              Olvidaste tu contraseña
            </button>

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
