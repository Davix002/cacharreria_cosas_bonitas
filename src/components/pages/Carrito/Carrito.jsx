import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./UseCart";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function Carrito() {
  const { state, increaseProductQuantity, decreaseProductQuantity, removeFromCart } = useCart();
  const productsInCart = state.items;
  const total = state.total;

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-4xl sm:text-5xl  font-semibold mb-8">Tu carrito</h2>
      <p className="text-xl font-semibold mb-2">Resumen del carrito.</p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {productsInCart.map((product) => (
          <li
            key={product.id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product.imageSrc}
                alt={product.name}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      {product.name}
                    </h3>
                    <div className="min-w-24 flex">
                      <button
                        onClick={() => decreaseProductQuantity(product.id)}
                        type="button" className="h-7 w-7"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        value={product.quantity}
                      />
                      
                      <button
                        onClick={() => increaseProductQuantity(product.id)}
                        type="button" className="flex h-7 w-7 items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm">
                      Precio por unidad: {formatPrice(product.price)}
                    </p>
                    <p className="text-sm">
                      Total: {formatPrice(product.price * product.quantity)}
                    </p>
                  </div>
                </div>
                             
                <div className=" flex text-sm">
                  <button
                    type="button"
                    className="flex items-center space-x-1 px-2 py-1 pl-0"
                    onClick={() =>
                      handleRemoveFromCart(product.id)
                    }
                  >
                    <Trash size={12} className="text-red-500" />
                    <span className="text-xs font-medium text-red-500">Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total a pagar:
          <span className="font-semibold"> {formatPrice(total)}</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Link to="/cacharreria_cosas_bonitas">
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Volver a la tienda
          </button>
        </Link>

        <Link to="">
          <button
            type="button"
            className="w-full rounded-md bg-romTurquoise-600 text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Pagar
          </button>
        </Link>
      </div>
    </div>
  );
}
