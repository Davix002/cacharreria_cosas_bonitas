import HeartIcon from "../components/icons/HeartIcon";
import Star from "../components/icons/Star";
import PropTypes from 'prop-types';

const ProductItem = (props) => {
  return (
    <div
    key={props.product.id}
    className="relative overflow-hidden card group"
  >
    <div className="absolute z-10 top-3 right-3">
      <button
        type="button"
        className="inline-flex items-center justify-center text-gray-400 hover:text-rose-500"
      >
        <HeartIcon/>
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
        <div className="flex items-center mt-2.5">
          <div className="flex items-center space-x-px">
            {[1, 2, 3, 4, 5].map((e) => (
              <Star key={e}/>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-500 ml-1.5">
            ({props.product.ratings})
          </p>
        </div>
        <p className="mt-5 text-sm font-bold text-gray-900 ">
          {props.product.price}
        </p>
      </div>
    </div>
  </div>
  )
}

ProductItem.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageSrc: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ratings: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  };
  
export default ProductItem