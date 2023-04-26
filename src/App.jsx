import Header from "./components/Header";
import Footer from "./components/Footer";
import Imagen from "./img/imagen_principal.png";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <div className="h-1/2 w-full relative">
          <img
            src={Imagen}
            className="absolute top-0 left-0 h-full w-full object-cover"
            alt="Imagen principal"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
