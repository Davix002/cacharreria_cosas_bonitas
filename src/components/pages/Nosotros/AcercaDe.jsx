import Imagen from "../../../assets/SobreNosotros.jpg";

const AcercaDe = () => {
  return (

    <div className="container p-10 flex bg-white">
      <div className="p-5 text-justify  justify-center m-5 ">
      <h1 className="text-5xl  font-bold mb-8">Nosotros</h1>
        <h2 className="text-xl font-bold mb-2">Quiénes somos:</h2>
        <p className="mb-4">
          Somos una Cacharrería o tienda de variedades que se esfuerza por
          ofrecer a nuestros clientes una experiencia de compra satisfactoria.
          Nos enorgullece ofrecer una amplia selección de productos de alta
          calidad a precios competitivos, y brindar un excelente servicio al
          cliente. Nos esforzamos por ser un lugar donde nuestros clientes
          puedan encontrar todo lo que necesitan, desde productos para el hogar
          y la decoración hasta artículos de uso diario y regalos. Estamos
          comprometidos con la satisfacción del cliente y en crear un ambiente
          acogedor y agradable en nuestra tienda.
        </p>

        <h2 className="text-xl font-bold mb-2">Misión:</h2>
        <p className="mb-4">
          Nuestra misión en la Cacharrería Cosas bonitas es proporcionar a
          nuestros clientes una experiencia de compra única y satisfactoria. Nos
          comprometemos a ofrecer una amplia selección de productos de alta
          calidad a precios competitivos, para satisfacer las necesidades y
          deseos de nuestros clientes. También nos esforzamos por brindar un
          excelente servicio al cliente, así como un ambiente agradable y
          acogedor en nuestra tienda.
        </p>

        <h2 className="text-xl font-bold mb-2">Visión:</h2>
        <p className="mb-4">
          Nuestra visión es convertirnos en la Cacharrería Cosas bonitas líder
          en la región, reconocida por nuestra amplia selección de productos,
          excelente servicio al cliente y precios competitivos. Buscamos ser un
          referente para nuestros clientes en cuanto a calidad y variedad de
          productos, y ser un lugar donde puedan encontrar todo lo que necesitan
          en un solo lugar.
        </p>
      </div>
      <div className="p-10">
        <img
          src={Imagen}
          className="shadow-xl rounded-3xl drop-shadow-xl"
          alt="Imagen principal"
        />
      </div>
    </div>
  );
};

export default AcercaDe;
