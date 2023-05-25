import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CategoryGroup from "./CategoryGroup";
import useChunks from "./useChunks";

const CategoryCarousel = (props) => {
  const chunkSize = useChunks();
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
        interval={3000}
        transitionTime={2000}
      >
        {groupedCategories.map((categoryGroup, groupIndex) => (
          <CategoryGroup key={groupIndex} categoryGroup={categoryGroup} />
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

