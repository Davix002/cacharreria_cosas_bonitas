import Logo from "../assets/logo_horizontal.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
        {/* logo */}

        <img src={Logo} className="w-2/12 my-2" alt="logo" />

        {/* navigation */}

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-2">
            <div className="flex items-center md:order-2">
              <button
                data-collapse-toggle="mega-menu"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mega-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              id="mega-menu"
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            >
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                <li className="p-2 border-b-2 border-teal-500 border-opacity-0 hover:border-opacity-100 hover:text-teal-500 duration-200 cursor-pointer active">
                  <Link to="/">Inicio</Link>
                </li>
                <li className="p-2 border-b-2 border-teal-500 border-opacity-0 hover:border-opacity-100 hover:text-teal-500 duration-200 cursor-pointer">
                  <button
                    id="mega-menu-dropdown-button"
                    data-dropdown-toggle="mega-menu-dropdown"
                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-teal-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {/* <Link to="/Productos">Productos</Link> */}
                    Productos
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="mega-menu-dropdown"
                    className="absolute z-50 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700"
                  >
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Cocina
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Plasticos
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Cuidado personal
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Papelería
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4">
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Electro y tecnología
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Juguetería
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Aseo del hogar
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            DecoHogar
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Mascotas
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Piñatería
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500"
                          >
                            Variedades
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="p-2 border-b-2 border-teal-500 border-opacity-0 hover:border-opacity-100 hover:text-teal-500 duration-200 cursor-pointer">
                  <Link to="/Nosotros">Nosotros</Link>
                </li>
                <li className="p-2 border-b-2 border-teal-500 border-opacity-0 hover:border-opacity-100 hover:text-teal-500 duration-200 cursor-pointer">
                  <Link to="/API">API</Link>
                </li>
                <li className="p-2 border-b-2 border-teal-500 border-opacity-0 hover:border-opacity-100 hover:text-teal-500 duration-200 cursor-pointer">
                  <Link to="/Login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* buttons */}
        <div className="w-2/12 flex justify-center">
          <a href="">
            <svg
              className="h-8 p-1 hover:text-teal-500 duration-200 svg-inline--fa fa-search fa-w-16 fa-9x"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                className=""
              ></path>
            </svg>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
