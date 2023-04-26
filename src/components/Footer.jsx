const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-white shadow-md-up md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center ">
          © 2023 Cacharrería Cosas Bonitas™ . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 "
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 "
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 "
            >
              API
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-sm text-gray-500 hover:underline"
            >
              Contactanos
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
