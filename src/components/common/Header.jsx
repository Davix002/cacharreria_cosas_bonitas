import { useState } from "react";
import Logo from "../../assets/logo_horizontal.svg";
import LogoSmall from "../../assets/favicon_cs.svg";
import Lupa from "../icons/Lupa";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";
import Search from "../common/Search";
import CarritoIcon from "../icons/CarritoIcon";
import CarritoDropDown from "../pages/Carrito/CarritoDropDown";
import PerfilDropDown from "../pages/Users/PerfilDropDown";
import PerfilIcon from "../icons/PerfilIcon";
import { useAuth } from "../../Auth/UseAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [isCarritoDropDown, setCarritoDropDown] = useState(false);
  const [isPerfilDropDown, setPerfilDropDown] = useState(false);
  const { isLogueado } = useAuth();

  return (
    <>
      <header className="z-50 header sticky top-0 bg-white shadow-md flex items-center justify-between py-2 sm:py-0 sm:px-8">
        {/* logo */}
        <Link
          to="/cacharreria_cosas_bonitas/"
          className="w-1/2 sm:w-2/12 flex-shrink-0"
        >
          <img
            src={Logo}
            alt="logo"
            className="hidden p-2 md:block flex-shrink-0"
          />
          <img
            src={LogoSmall}
            alt="logo small"
            className="block w-1/5 m-auto p-1 sm:w-1/2 md:hidden flex-shrink-0"
          />
        </Link>
        {/* navigation */}
        <nav
          className={`sm:block ${
            isOpen ? "block" : "hidden"
          } absolute sm:relative w-full sm:w-auto bg-white sm:bg-transparent z-20 sm:z-0 top-full sm:top-auto left-0 sm:left-auto font-semibold`}
        >
          <ul className="flex flex-col sm:flex-row items-center">
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer active">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                to="/cacharreria_cosas_bonitas/"
              >
                Inicio
              </Link>
            </li>

            <li className=" border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                to="/cacharreria_cosas_bonitas/Nosotros/"
              >
                Nosotros
              </Link>
            </li>
            <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                to="/cacharreria_cosas_bonitas/Contactanos/"
              >
                Contáctanos
              </Link>
            </li>

            {!isLogueado && (
              // Si el usuario no está logueado, muestra los botones de login y register
              <>
                <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    to="/cacharreria_cosas_bonitas/Login/"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="p-4 border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    to="/cacharreria_cosas_bonitas/Register/"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            <li className="w-1/2 p-4 sm:hidden border-b-2 border-romTurquoise-500 border-opacity-0 hover:border-opacity-100 hover:text-romTurquoise-500 duration-200 cursor-pointer">
              <div className="flex items-center">
                <Lupa onClick={() => setSearch(!search)} />
                {search && (
                  <Search
                    search={search}
                    setSearch={setSearch}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                )}
              </div>
            </li>
          </ul>
        </nav>
        <div className="m-auto sm:hidden">
          <BurgerMenuIcon
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 cursor-pointer"
            width={42}
            height={42}
            color="black"
          />
        </div>
        {/* searchButton */}
        <div className="hidden w-4/12 space-x-2 sm:w-2/12 sm:flex justify-center">
          <div>
            <Lupa onClick={() => setSearch(!search)} />
            {search && (
              <Search
                search={search}
                setSearch={setSearch}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
          <div>
            <CarritoIcon
              onClick={() => {
                setCarritoDropDown(!isCarritoDropDown);
                setPerfilDropDown(false);
              }}
            />

            {isCarritoDropDown && (
              <CarritoDropDown
                isCarritoDropDown={isCarritoDropDown}
                setCarritoDropDown={setCarritoDropDown}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
          <div>
            {isLogueado && (
              <div>
                <PerfilIcon
                  onClick={() => {
                    setPerfilDropDown(!isPerfilDropDown);
                    setCarritoDropDown(false);
                  }}
                />
                {isPerfilDropDown && (
                  <PerfilDropDown
                    isPerfilDropDown={isPerfilDropDown}
                    setPerfilDropDown={setPerfilDropDown}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
