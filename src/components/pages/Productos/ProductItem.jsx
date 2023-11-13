import PropTypes from "prop-types";
import CarritoIcon from "../../icons/CarritoIcon";
import { useCart } from "../Carrito/UseCart";
import { useState, useEffect } from "react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductItem = (props) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeout;
    if (isAdded) {
      timeout = setTimeout(() => setIsAdded(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isAdded]);  

  const handleAddToCart = async () => {
    try {
      setError(null);
      await addToCart(props.product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    } catch (e) {
      setError("No se pudo agregar al carrito");
    }
  };

  const formattedPrice = formatPrice(parseFloat(props.product.price));

  return (
    <div
      key={props.product.id}
      className="relative overflow-hidden card group h-[altura] flex flex-col  p-8"
    >
      <div className="absolute z-10 top-3 right-3"></div>
      <div className="relative flex-grow">
        <div className="aspect-w-1 aspect-h-1">
          <img
            className="object-contain w-full h-52"
            src={props.product.thumbnail}
            alt={props.product.imageAlt}
          />
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
            {props.product.brand}
          </p>
          <h3 className="mt-2 text-sm font-medium text-gray-900 pb-2">
            <a href="#" title="">
              {props.product.name}
            </a>
          </h3>
        </div>
      </div>
      <div className="mt-auto inline-flex flex-col items-center justify-center">
        <p className="text-lg font-bold text-gray-900 price text-center">
          {formattedPrice}
        </p>
        {isAdded && (
          <div className="absolute z-20 top-3 left-3 bg-romTurquoise-600 text-white font-semibold rounded-2xl py-2 px-4 shadow-md">
            Agregado al carrito
          </div>
        )}
        {error && (
          <div className="absolute z-20 top-3 left-3 bg-red-600 text-white font-semibold rounded-2xl py-2 px-4 shadow-md">
            {error}
          </div>
        )}
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center bg-romTurquoise-600 text-white rounded-xl p-2 hover:bg-black/80 mt-4"
          onClick={handleAddToCart}
        >
          Agregar al carrito
          <CarritoIcon className="mt-2" />
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductItem;
