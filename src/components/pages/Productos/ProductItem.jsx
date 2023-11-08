import PropTypes from "prop-types";
import CarritoIcon from "../../icons/CarritoIcon";
import { useCart } from "../Carrito/UseCart";
import { useAuth } from "../../../Auth/UseAuth";
import { addProductToCart } from "../../../config/api/apiUtils";

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
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      imageSrc: product.thumbnail,
      quantity: 1,
    };

    if (isLogueado) {
      const cartItem = await addProductToCart(usuario, productToAdd);
      const productWithCartId = {
        ...productToAdd,
        cartItemId: cartItem._id,
      };

      dispatch({ type: "ADD_TO_CART", payload: productWithCartId });
    } else {
      const productWithCartId = {
        ...productToAdd,
        cartItemId: product.id,
      };
      dispatch({ type: "ADD_TO_CART", payload: productWithCartId });
      
      // Lógica para usuarios no logueados: Agregar al carrito en localStorage
      let cart = localStorage.getItem("cart");

      cart = cart ? JSON.parse(cart) : { products: [], total: 0 };

      const existingItemIndex = cart.products.findIndex((item) => {
        return item.id === productToAdd.id;
      });

      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar la cantidad
        cart.products[existingItemIndex].quantity += 1;
      } else {
        // Si el producto no existe, agregarlo al arreglo
        cart.products.push(productToAdd);
      }

      // Recalcular el total
      cart.total = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Guardar de nuevo en el localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
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
