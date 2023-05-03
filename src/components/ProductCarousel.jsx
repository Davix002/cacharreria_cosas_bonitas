import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CategoryCarousel = (props) => {
  const [chunkSize, setChunkSize] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setChunkSize(1);
      } else if (window.innerWidth <= 768) {
        setChunkSize(2);
      } else if (window.innerWidth <= 1024) {
        setChunkSize(3);
      } else {
        setChunkSize(3);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center justify-items-center h-full bg-gray-200"
          >
            {categoryGroup.map((category, index) => (
              <div
                key={index}
                className="p-10 h-full flex flex-col card items-center text-center"
              >
                <div className="flex-shrink-0">
                  <img
                    src={category.imageSrc}
                    alt={category.name}
                    className="w-full h-auto max-w-40 max-h-40 object-contain mb-4"
                  />
                </div>
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
