import PropTypes from "prop-types";
import CarritoIcon from "../../icons/CarritoIcon";
import { useCart } from '../Carrito/UseCart';
import { useAuth } from '../../../Auth/UseAuth';
import { addProductToCart } from '../../../config/api/apiUtils'; 

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductItem = (props) => {

  const { isLogueado, usuario } = useAuth();
  const { dispatch } = useCart();

  const addToCart = async (product) => {
    // Estructura del producto como se espera en el estado y el componente Carrito
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      imageSrc: product.thumbnail,
      quantity: 1
    };
  
    // Agregar producto al carrito en el estado global
    dispatch({ type: 'ADD_TO_CART', payload: productToAdd });
  
    // Si el usuario está logueado, hacer solicitud al backend para actualizar el carrito en la base de datos
    if (isLogueado) {
      await addProductToCart(usuario, productToAdd);
    }
  };
  
  
  const formattedPrice = formatPrice(parseFloat(props.product.price));

  return (<div key={props.product.id} className="relative overflow-hidden card group h-[altura] flex flex-col  p-8">
    <div className="absolute z-10 top-3 right-3">
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
    price: PropTypes.number,
  }).isRequired,
};

export default ProductItem;
