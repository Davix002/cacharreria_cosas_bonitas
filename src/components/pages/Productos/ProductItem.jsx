import PropTypes from "prop-types";
import CarritoIcon from "../../icons/CarritoIcon";
import { useCart } from '../Carrito/CartContext';
import { useAuth } from '../../../Auth/UseAuth';



const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductItem = (props) => {

  const { isLogueado, usuario } = useAuth();
  const { state, dispatch } = useCart();

  const addToCart = async (product) => {
    // Verificar si el usuario está autenticado
    if (!isLogueado) {
      console.log('El usuario no está autenticado');
      return;
    }
    //console.log(usuario);
    // Agregar producto al carrito en el estado global
    dispatch({ type: 'ADD_TO_CART', payload: product });
  console.log(usuario);
    // Hacer solicitud al backend para actualizar el carrito en la base de datos
    const response = await fetch('http://localhost:5800/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: usuario.email, // Usar el correo electrónico del usuario autenticado
        userID: usuario._id,
        productID: product.id,
        quantity: 1, // Cantidad del producto que se está añadiendo
      }),
    });
  
    const data = await response.json();
    console.log(data);
  };
  
  const formattedPrice = formatPrice(parseFloat(props.product.price));

  return (<div key={props.product.id} className="relative overflow-hidden card group h-[altura] flex flex-col  p-8">
    <div className="absolute z-10 top-3 right-3">
      {/* ... */}
    </div>
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
      <button
        type="button"
        className="inline-flex flex-col items-center justify-center bg-romTurquoise-600 text-white rounded-xl p-2 hover:bg-black/80 mt-4"
        onClick={() => addToCart(props.product)}
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
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
