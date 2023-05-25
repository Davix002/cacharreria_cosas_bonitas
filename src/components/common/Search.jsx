import Categories from "../../data/categories";
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm";

const Search = ({search, setSearch,isOpen, setIsOpen}) => {
  const [filter, setFilter] = useState("");

  const categoryArray = Object.keys(Categories).map(
    (key) => Categories[key]["name"]
  );

  const handleInputChange = (event) => {
    setFilter(event.target.value.toUpperCase());
  };

  const handleLinkClick = () => {
    setSearch(!search);
    setIsOpen(!isOpen);
  };

  const filteredCategories = categoryArray.filter((category) =>
    category.toUpperCase().includes(filter)
  );

  return (
    <div className="bg-white flex absolute mt-2 w-fit sm:w-max rounded shadow-lg py-1 z-10 -m-24 -translate-x-1 sm:-ml-36 md:-ml-12 overflow-y-auto">
      <div className="dropdown">
        <div id="myDropdown" className="dropdown-content">
          <input
            type="text"
            placeholder="Search.."
            id="myInput"
            onChange={handleInputChange} 
          />
          {filter &&
            filteredCategories.map((category) => (
              <Link
                key={category}
                className={SubMenu}
                to={`/cacharreria_cosas_bonitas/${category}/`}
                onClick={handleLinkClick} 
              >
                {category}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
    search: PropTypes.bool.isRequired,
    setSearch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  };
  

export default Search;
