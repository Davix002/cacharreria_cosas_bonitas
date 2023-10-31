import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteProductFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartItems
} from "../../../config/api/apiUtils";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function CartOne() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const handleIncreaseQuantity = async (productId) => {
    const updatedProducts = await increaseQuantity(products, productId);
    setProducts(updatedProducts);
  };

  // Disminuir cantidad de producto en el carrito
  const handleDecreaseQuantity = async (productId) => {
    const updatedProducts = await decreaseQuantity(products, productId);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const { products, total } = await getCartItems();
      setProducts(products);
      setTotal(total);
    };
  
    fetchCartItems();
  }, []);

  useEffect(() => {
    const newTotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotal(newTotal);
  }, [products]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-4xl sm:text-5xl  font-semibold mb-8">Tu carrito</h2>
      <p className="text-xl font-semibold mb-2">Resumen del carrito.</p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {products.map((product) => (
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
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded-l"
                      >
                        -
                      </button>
                      <div className="bg-gray-200 text-black py-1 px-3 rounded-none">
                        {product.quantity}
                      </div>
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded-r"
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
                <div className="flex divide-x text-sm">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1 pl-0"
                    onClick={() =>
                      deleteProductFromCart(
                        products,
                        setProducts,
                        total,
                        setTotal,
                        product.id
                      )
                    }
                  >
                    <Trash size={16} />
                    <span>Eliminar</span>
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

        <Link to="/cacharreria_cosas_bonitas/CarritoPagar">
          <button
            type="button"
            className="w-full rounded-md bg-romTurquoise-600 text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Ir a pagar
          </button>
        </Link>
      </div>
    </div>
  );
}
