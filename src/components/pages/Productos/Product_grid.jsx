import Flecha_der from "../../icons/Flecha_der";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";

const Product_grid = (props) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Head */}
        <div className="flex items-center justify-center lg:justify-between">
          <h2 className="text-2xl text-zinc-700 font-bold sm:text-3xl">
            {props.products.category}
          </h2>

          <div className="hidden lg:flex">
            <a
              href="#"
              title=""
              className="inline-flex items-center justify-center p-1 -m-1 text-sm font-bold transition-all duration-200 rounded-md focus:text-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:text-gray-900"
            >
              Ver todo
              <Flecha_der />
            </a>
          </div>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:mt-10">
          {props.products.array_products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        {/* Small Screen ver todo */}
        <div className="mt-12 text-center lg:hidden">
          <a
            href="#"
            title=""
            className="inline-flex items-center justify-center p-1 text-sm font-bold text-gray-600 transition-all duration-200 rounded-md focus:text-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:text-gray-900"
          >
            Ver todo
            <Flecha_der />
          </a>
        </div>
      </div>
    </section>
  );
};

Product_grid.propTypes = {
  products: PropTypes.shape({
    category: PropTypes.string.isRequired,
    array_products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default Product_grid;
