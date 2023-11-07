import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/UseAuth";
import {
  FaUser,
  FaEnvelope,
  FaAddressCard,
  FaMailBulk,
  FaPhone,
  FaCreditCard,
} from "react-icons/fa";

function Perfil() {
  const navigate = useNavigate();
  const { usuario, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    address: "",
    postalCode: "",
    phone: "",
    creditCardNumber: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/cacharreria_cosas_bonitas/Login/");
    }

    if (usuario) {
      setProfile({
        address: usuario.address || "",
        postalCode: usuario.postalCode || "",
        phone: usuario.phone || "",
        creditCardNumber: usuario.creditCardNumber || "",
      });
    }
  }, [navigate, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(profile);
  };

  if (!usuario) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl sm:text-5xl font-semibold text-center text-gray-800">
          Perfil
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-400" />
            <span className="flex-1 font-semibold">{usuario.nombre}</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-gray-400" />
            <span className="flex-1">{usuario.email}</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaAddressCard className="text-gray-400" />
              <span className="flex-1">
                {usuario.address || "Añadir dirección"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMailBulk className="text-gray-400" />
              <span className="flex-1">
                {usuario.postalCode || "Añadir código postal"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-gray-400" />
              <span className="flex-1">
                {usuario.phone || "Añadir teléfono"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <FaCreditCard className="text-gray-400" />
              <span className="flex-1">
                {usuario.creditCardNumber
                  ? `**** **** **** ${usuario.creditCardNumber.slice(-4)}`
                  : "Añadir tarjeta de crédito"}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            {Object.entries(profile).map(
              ([key, value]) =>
                !usuario[key] && (
                  <input
                    key={key}
                    type={key === "creditCardNumber" ? "password" : "text"}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Ingrese su ${key
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    className="w-full p-3 border rounded text-gray-600"
                  />
                )
            )}
          </div>
          {(!usuario.address ||
            !usuario.postalCode ||
            !usuario.phone ||
            !usuario.creditCardNumber) && (
            <button
              type="submit"
              className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
            >
              Guardar Cambios
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Perfil;
