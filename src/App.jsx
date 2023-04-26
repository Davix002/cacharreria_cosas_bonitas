import Header from "./components/Header";
import Footer from "./components/Footer";
import Imagen from "./img/imagen_principal.png";
import ProductCarousel from "./components/ProductCarousel";

const products = [
  {
    name: "Olla grande",
    description: "Descripción del producto 1",
    image: "./src/img/producto_1.png",
    price: "$40.000",
  },
  {
    name: "Vajilla",
    description: "Descripción del producto 2",
    image: "./src/img/producto_2.png",
    price: "$30.000",
  },
  {
    name: "Juego de vasos",
    description: "Descripción del producto 3",
    image: "./src/img/producto_3.png",
    price: "$20.000",
  },
];

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <div className="h-full w-full relative">
          <img
            src={Imagen}
            className="absolute top-0 left-0 h-full w-full object-cover"
            alt="Imagen principal"
          />
        </div>
      </div>
      <ProductCarousel products={products} />
      <Footer />
    </div>
  );
}
