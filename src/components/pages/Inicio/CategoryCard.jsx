import PropTypes from "prop-types";

const CategoryCard = ({ category }) => (
  <div className="p-10 h-full flex flex-col card items-center text-center">
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
);

CategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
