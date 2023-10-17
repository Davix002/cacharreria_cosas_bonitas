import HeartIcon from "../../icons/HeartIcon";
import PropTypes from "prop-types";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductItem = (props) => {
  const formattedPrice = formatPrice(parseFloat(props.product.price));

  return (
    <div key={props.product.id} className="relative overflow-hidden card group">
      <div className="absolute z-10 top-3 right-3">
        <button
          type="button"
          className="inline-flex items-center justify-center text-gray-400 hover:text-rose-500"
        >
          <HeartIcon />
        </button>
      </div>
      <div className="relative ">
        <div className="aspect-w-1 aspect-h-1">
          <img
            className="object-contain w-full h-52 p-4"
            src={props.product.imageSrc}
            alt={props.product.imageAlt}
          />
        </div>

        <div className="px-6 py-4 flex-1 flex flex-col">
          <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
            {props.product.brand}
          </p>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <a href="#" title="">
              {props.product.name}
            </a>
          </h3>
          <p className="mt-5 text-lg font-bold text-gray-900 price">
            {formattedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
