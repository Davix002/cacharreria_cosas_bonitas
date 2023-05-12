import { useState } from "react";
import Logo from "../../assets/logo_horizontal.svg";
import LogoSmall from "../../assets/favicon_cs.svg";
import Lupa from "../icons/Lupa"
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="z-50 header sticky top-0 bg-white shadow-md flex items-center justify-between py-2 sm:py-0 sm:px-8">
        {/* logo */}

        <Link to="/cacharreria_cosas_bonitas/" className="w-4/12 sm:w-2/12 my-2">
          <img src={Logo} alt="logo" className="hidden md:block"/>
          <img src={LogoSmall} alt="logo small" className="block w-3/12 m-auto sm:w-1/2 md:hidden"/>
        </Link>
        {/* navigation */}
        <nav className={`sm:block ${isOpen ? "block" : "hidden"} absolute sm:relative w-full sm:w-auto bg-white sm:bg-transparent z-20 sm:z-0 top-full sm:top-auto left-0 sm:left-auto font-semibold`}>          <ul className="flex flex-col sm:flex-row items-center">
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer active">
              <Link onClick={() => setIsOpen(!isOpen)} to="/cacharreria_cosas_bonitas/">Inicio</Link>
            </li>
            <li className=" border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <DropdownMenu />
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link onClick={() => setIsOpen(!isOpen)} to="/cacharreria_cosas_bonitas/Nosotros/">Nosotros</Link>
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link onClick={() => setIsOpen(!isOpen)} to="/cacharreria_cosas_bonitas/Contactanos/">Contáctanos</Link>
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link onClick={() => setIsOpen(!isOpen)} to="/cacharreria_cosas_bonitas/Login/">Login</Link>
            </li>
          </ul>
        </nav>
        <div className=" sm:hidden">
          <BurgerMenuIcon onClick={() => setIsOpen(!isOpen)} className="h-6 w-6 cursor-pointer" width={24} height={24} color="black"/>
        </div>
        {/* searchButton */}
        <div className="w-4/12 sm:w-2/12 flex justify-center">
          <a href="#">
            <Lupa/>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
