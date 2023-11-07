import FacebookIcon from "../../icons/FacebookIcon";
import InstagramIcon from "../../icons/InstagramIcon";
import LinkedInIcon from "../../icons/LinkedInIcon";
import TwitterIcon from "../../icons/TwitterIcon";

const Contactenos = () => {
  return (
    <>
     <section className=" flex flex-col w-full h-full sm:flex-row  bg-gray-200">
        <div className="flex flex-col justify-center  w-full p-8  lg:px-12 xl:px-32 lg:w-1/2">
          <h1 className="text-2xl font-semibold text-black-900 capitalize lg:text-5xl">
            Contáctanos
          </h1>

          <p className="mt-4 text-gray-800 ">
            Pregúntenos todas sus dudas y nos encantará responder
          </p>

          <div className="mt-6 md:mt-8 w-full flex flex-col items-start justify-center lg:w-1/2">
            <h3 className="font-medium text-gray-600 ">Síguenos: </h3>

            <div className="flex items-center mt-4 -mx-1.5 ">
              <a
                className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                href="#"
              >
                <TwitterIcon />
              </a>

              <a
                className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                href="#"
              >
                <LinkedInIcon />
              </a>

              <a
                className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                href="#"
              >
                <FacebookIcon />
              </a>

              <a
                className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                href="#"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white p-8 sm:m-10 sm:card lg:w-1/2 lg:px-12 xl:px-24 ">
          <form>
            <div className="-mx-2 md:items-center md:flex">
              <div className="flex-1 px-2">
                <label className="block mb-2 text-l text-gray-600">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="flex-1 px-2 mt-4 md:mt-0">
                <label className="block mb-2 text-l text-gray-600">
                  Correo electronico
                </label>
                <input
                  type="email"
                  placeholder="Ingrese su correo"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>

            <div className="w-full mt-4">
              <label className="block mb-2 text-l text-gray-600">
                Mensaje
              </label>
              <textarea
                className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Cuéntenos el motivo de consulta"
              ></textarea>
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
                Enviar inquietud
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contactenos;
