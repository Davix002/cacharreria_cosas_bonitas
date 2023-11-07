import { Link } from "react-router-dom";
import { useAuth } from "../../../Auth/UseAuth";
import PropTypes from "prop-types";

export default function PerfilDropDown({ setPerfilDropDown }) {
  const { logOut } = useAuth();

  function handleOptionClick() {
    setPerfilDropDown(false);
  }

  return (
    <div
      className="bg-white px-5 py-3 flex my-6 absolute right-4 mt-2 w-auto max-w-md sm:max-w-md rounded shadow-lg z-50 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/cacharreria_cosas_bonitas/Perfil/"
              onClick={handleOptionClick}
            >
              Mi perfil
            </Link>
          </li>
          <li>
            <Link
              to="/cacharreria_cosas_bonitas/Login/"
              onClick={() => {
                logOut();
                handleOptionClick();
              }}
            >
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

PerfilDropDown.propTypes = {
  setPerfilDropDown: PropTypes.func.isRequired,
};
