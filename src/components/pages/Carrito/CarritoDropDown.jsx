import { X } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "./UseCart";

export default function CarritoDropDown({ setCarritoDropDown }) {
  const cart = useCart();

  if (!cart) {
    return null; 
  }

  const { state } = cart;
  const productsInCart = state.items;

  function handleViewCartClick() {
    setCarritoDropDown(false);
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className=" bg-white px-5 py-3 flex my-6 absolute max-h-[70vh] right-4 mt-2 w-auto max-w-md sm:max-w-md rounded shadow-lg z-50 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className=" mt-4 space-y-6">
        <ul>
          <div
            onClick={handleViewCartClick}
            className="relative ml-auto block text-gray-600 transition"
          >
            <span className="sr-only">Cerrar Carrito</span>
            <X size={24} className="icon-hover-effect" />
          </div>
        </ul>
        <ul className="space-y-4">
          {productsInCart.map((product) => (
            <li key={product.id} className="flex items-center gap-4">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="h-16 w-16 rounded object-contain"
              />
              <div>
                <h3 className="text-sm text-gray-900">{product.name}</h3>
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dd className="inline font-bold">
                      {formatPrice(product.price)}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-4 text-center">
          <Link
            to="/cacharreria_cosas_bonitas/Carrito/"
            onClick={handleViewCartClick}
          >
            <div className="w-full mb-2 rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Ver carrito
            </div>
          </Link>
          <Link
            to=""
            onClick={handleViewCartClick}
          >
            <div className="w-full rounded-md bg-romTurquoise-600 text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Pagar
            </div>
          </Link>

          <Link
            className="pb-4 inline-block text-sm text-gray-600 transition hover:text-gray-700 hover:underline hover:underline-offset-4"
            to="/cacharreria_cosas_bonitas/"
            onClick={handleViewCartClick}
          >
            Continuar comprando &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

CarritoDropDown.propTypes = {
  setCarritoDropDown: PropTypes.func.isRequired,
};
