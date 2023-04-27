import Imagen_principal from "./components/Imagen_principal";
import ProductCarousel from "./components/ProductCarousel";
import { products } from "./data/products";

const Inicio = () => {
  return (
    <div className="flex flex-col h-screen">
        <Imagen_principal/>
        <ProductCarousel products={products} />
    </div>
  )
}

export default Inicio