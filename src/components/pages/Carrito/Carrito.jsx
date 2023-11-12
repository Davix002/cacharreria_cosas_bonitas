import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./UseCart";
import { useEffect, useContext } from "react";
import AuthContext from "../../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function Carrito() {
  const {
    cartItems,
    total,
    updateQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const productsInCart = cartItems;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { isLogueado, usuario } = useContext(AuthContext);
  //const [paymentSuccess, setPaymentSuccess] = useState(false);
  const MySwal = withReactContent(Swal);
  const [userDetails, setUserDetails] = useState({
    nombre: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    creditCardNumber: "",
  });

  useEffect(() => {
    if (isLogueado && usuario) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        address: usuario.address || "",
        postalCode: usuario.postalCode || "",
        phone: usuario.phone || "",
        creditCardNumber: usuario.creditCardNumber || "",
      }));
    }
  }, [isLogueado, usuario]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = async (userDetails) => {
    const orderDetails = {
      products: productsInCart.map((item) => ({
        _id: item.id,
        quantity: item.quantity,
      })),
      totalAmount: total,
      status: "Payment Received / Approved",
      ...userDetails,
    };

    if (isLogueado && usuario._id) {
      orderDetails.userID = usuario._id;
    }

    try {
      const response = await fetch("http://localhost:5800/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newOrder = await response.json();

      if (newOrder) {
        clearCart();
        MySwal.fire({
          title: '¡Pago exitoso!',
          text: 'Tu pedido ha sido procesado correctamente.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ver pedidos',
          cancelButtonText: 'Volver a la tienda',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/cacharreria_cosas_bonitas/Purchases");
          } else {
            navigate("/cacharreria_cosas_bonitas");
          }
        });
      }
    } catch (error) {
      console.error("Error al crear la orden: ", error);
    }
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
                        onClick={() =>
                          decreaseProductQuantity(product.cartItemId)
                        }
                        type="button"
                        className="h-7 w-7"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(e, product.cartItemId)
                        }
                      />

                      <button
                        onClick={() =>
                          increaseProductQuantity(product.cartItemId)
                        }
                        type="button"
                        className="flex h-7 w-7 items-center justify-center"
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
                    onClick={() => handleRemoveFromCart(product.cartItemId)}
                  >
                    <Trash size={12} className="text-red-500" />
                    <span className="text-xs font-medium text-red-500">
                      Eliminar
                    </span>
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
            className="w-full rounded-md bg-romTurquoise-600 text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Pagar
          </button>
        </Link>
      </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              handlePayment(userDetails);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre completo"
                  value={userDetails.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Dirección
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Dirección de envío"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Código Postal
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Código Postal"
                  value={userDetails.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Teléfono
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Número de teléfono"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4 col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="creditCardNumber"
                >
                  Número de Tarjeta de Crédito
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="creditCardNumber"
                  name="creditCardNumber"
                  type="text"
                  placeholder="Número de tarjeta de crédito"
                  value={userDetails.creditCardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Confirmar Pago
              </button>
            </div>
          </form>
        </Modal>
    </div>
  );
}
