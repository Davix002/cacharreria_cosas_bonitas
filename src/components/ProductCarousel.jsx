import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ products }) => {
  const chunkSize = 4;

  const groupedProducts = Array.from(
    { length: Math.ceil(products.length / chunkSize) },
    (_, i) => products.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <div className="relative">
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        interval={4000}
        transitionTime={2000}
      >
        {groupedProducts.map((productGroup, groupIndex) => (
          <div
            key={groupIndex}
            className="p-4 flex flex-row items-center justify-around bg-gray-200"
          >
            {productGroup.map((product, index) => (
              <div
                key={index}
                className="p-10 flex flex-col card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-contain mb-4"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold mt-2">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ProductCarousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductCarousel;
