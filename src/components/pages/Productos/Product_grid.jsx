import Flecha_der from "../../icons/Flecha_der";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Product_grid = ({ products, currentCategoryId, categories }) => {

  const getNextCategoryLink = () => {
    const categoryIds = Object.keys(categories);
    const currentIndex = categoryIds.indexOf(currentCategoryId);
    const nextIndex = (currentIndex + 1) % categoryIds.length;
    const nextCategoryId = categoryIds[nextIndex];
    const nextCategoryName = categories[nextCategoryId].name;
    return `/cacharreria_cosas_bonitas/${nextCategoryName}/`;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Head */}
        <div className="flex items-center justify-center lg:justify-between">
          <h2 className="text-2xl text-zinc-700 font-bold sm:text-3xl">
            {products.category}
          </h2>

          <div className="hidden lg:flex">
            <Link
              to={getNextCategoryLink()}
              className="inline-flex items-center justify-center p-1 -m-1 text-sm font-bold transition-all duration-200 rounded-md focus:text-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:text-gray-900"
            >
              Siguiente
              <Flecha_der />
            </Link>
          </div>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:mt-10">
          {products.array_products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        {/* Small Screen ver todo */}
        <div className="mt-12 text-center lg:hidden">
          <Link
            to={getNextCategoryLink()}
            className="inline-flex items-center justify-center p-1 text-sm font-bold text-gray-600 transition-all duration-200 rounded-md focus:text-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:text-gray-900"
          >
            Siguiente
            <Flecha_der />
          </Link>
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
  currentCategoryId: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
};


export default Product_grid;
