import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const CategoryGroup = ({ categoryGroup }) => (
  
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center justify-items-center h-full bg-gray-200">
    {categoryGroup.map((category, index) => {
      return (
        <Link key={index} to={`/cacharreria_cosas_bonitas/${category.name}/`} >
          <CategoryCard  category={category} />
        </Link>
      );
    })}
  </div>
);

CategoryGroup.propTypes = {
  categoryGroup: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryGroup;
