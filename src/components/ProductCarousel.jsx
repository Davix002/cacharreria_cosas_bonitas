import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CategoryCarousel = (props) => {
  const chunkSize = 3;

  const array_categories = props.categories;

  const groupedCategories = [];
  array_categories.forEach((_, i) => {
    if (i % chunkSize === 0) {
      groupedCategories.push(array_categories.slice(i, i + chunkSize));
    }
  });

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
        {groupedCategories.map((categoryGroup, groupIndex) => (
          <div
            key={groupIndex}
            className="p-4 flex flex-row items-center justify-around bg-gray-200"
          >
            {categoryGroup.map((category, index) => (
              <div key={index} className="p-10 flex flex-col card">
                <img
                  src={category.imageSrc}
                  alt={category.name}
                  className="w-40 h-40 object-contain mb-4"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

CategoryCarousel.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryCarousel;
