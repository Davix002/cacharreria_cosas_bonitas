import { Trash } from 'lucide-react'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("http://localhost:5800/api/cart")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.items.map(item => ({
          id: item._id._id,
          name: item._id.name,
          price: item._id.price,
          brand: item._id.brand,
          imageSrc: item._id.thumbnail,
          quantity: item.quantity,
        })));
        setTotal(data.items.reduce((acc, item) => acc + (item._id.price * item.quantity), 0));
      });
  }, []);

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-4xl sm:text-5xl  font-semibold mb-8">Tu carrito</h2>
      <p className="text-xl font-semibold mb-2">
        Resumen del carrito.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product.imageSrc}
                alt={product.name}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{product.name} (x{product.quantity})</h3>
                    <p className="text-sm">Precio por unidad: {formatPrice(product.price)}</p>
                    <p className="text-sm">Total: {formatPrice(product.price * product.quantity)}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0">
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
  )
}
