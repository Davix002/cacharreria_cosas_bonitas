import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../Auth/AuthContext'; // Asegúrate de importar correctamente AuthContext

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { isLogueado, usuario } = useContext(AuthContext);

  useEffect(() => {
    if (isLogueado && usuario)  {
      fetchOrders({ userID: usuario._id });
    }
  }, [isLogueado, usuario]);

  const fetchOrders = async (searchParams) => {
    setLoading(true);
    try {
        const queryParams = new URLSearchParams(searchParams);

      const response = await fetch(`http://localhost:5800/api/orders/?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError('Failed to fetch orders.');
      console.error('There was an error!', error);
    }
    setLoading(false);
  };

  const handleEmailSearch = (e) => {
    e.preventDefault();
    fetchOrders({ email });
  };

  return (
    <div>
      {loading && <p>Loading orders...</p>}
      {error && <p>{error}</p>}
      {!isLogueado && (
        <form onSubmit={handleEmailSearch}>
          <label htmlFor="email">Enter your email to find your orders:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Search Orders</button>
        </form>
      )}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {/* Renderizar detalles de la orden aquí */}
            Order ID: {order._id} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
