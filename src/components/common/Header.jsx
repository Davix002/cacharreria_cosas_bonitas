import Logo from "../../assets/logo_horizontal.svg";
import Lupa from "../icons/Lupa"
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  return (
    <>
      <header className="z-50 header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
        {/* logo */}

        <Link to="/cacharreria_cosas_bonitas/" className="w-2/12 my-2">
          <img src={Logo}  alt="logo" />
        </Link>
        {/* navigation */}
        <nav className="nav font-semibold text-lg">
          <ul className="flex items-center">
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer active">
              <Link to="/cacharreria_cosas_bonitas/">Inicio</Link>
            </li>
            <li className=" border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <DropdownMenu />
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link to="/cacharreria_cosas_bonitas/Nosotros/">Nosotros</Link>
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link to="/cacharreria_cosas_bonitas/Contactanos/">Contáctanos</Link>
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link to="/cacharreria_cosas_bonitas/Login/">Login</Link>
            </li>
          </ul>
        </nav>

        {/* buttons */}
        <div className="w-2/12 flex justify-center">
          <a href="">
            <Lupa/>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
