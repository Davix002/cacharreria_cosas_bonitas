import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../Auth/AuthContext";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  }).format(price);
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { isLogueado, usuario } = useContext(AuthContext);

  useEffect(() => {
    if (isLogueado && usuario) {
      fetchOrders({ userID: usuario._id });
    }
  }, [isLogueado, usuario]);

  const fetchOrders = async (searchParams) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(searchParams);

      const response = await fetch(
        `http://localhost:5800/api/orders/?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError("Failed to fetch orders.");
      console.error("There was an error!", error);
    }
    setLoading(false);
  };

  const handleEmailSearch = (e) => {
    e.preventDefault();
    fetchOrders({ email });
  };

  return (
    <div className="container mt-6 mx-auto px-4">
      {loading && <p className="text-center">Cargando compras...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLogueado && (
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleEmailSearch}
            className="flex flex-col gap-4 my-8 max-w-xl"
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Introduzca su dirección de correo electrónico para encontrar sus
              pedidos:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buscar pedidos
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <details
            key={order._id}
          >
            <summary className="cursor-pointer text-lg leading-6 font-medium text-gray-100 bg-romTurquoise-500 p-4 rounded-md hover:bg-romTurquoise-600 hover:scale-[1.01]">
              <h3 className="inline-block text-lg leading-6 font-medium text-gray-100 cursor-pointer">
                ID del pedido: {order._id}
              </h3>
            </summary>

            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Status: {order.status}
            </p>
            <p className="my-2 max-w-2xl text-sm text-gray-500">
              Total Amount: {formatPrice(order.totalAmount)}
            </p>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="text-sm font-medium text-gray-500">
                    Address: {order.address}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Postal Code: {order.postalCode}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Phone: {order.phone}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Email: {order.email}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Credit Card: **** **** ****{" "}
                    {order.creditCardNumber.slice(-4)}
                  </div>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                  <h4 className="text-sm font-medium text-gray-900">
                    Products:
                  </h4>
                  <div className="overflow-x-auto mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.products.map((product) => (
                          <tr key={product.productId ? product.productId._id : product._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {product.productId
                                ? product.productId.name
                                : "Producto no disponible"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              {product.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {product.productId
                                ? formatPrice(product.productId.price)
                                : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {product.productId
                                ? formatPrice(
                                    product.productId.price * product.quantity
                                  )
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </dl>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
