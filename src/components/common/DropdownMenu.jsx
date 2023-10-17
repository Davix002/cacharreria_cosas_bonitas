import { useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../../data/categories";
import useMenuColumns from "./useMenuColumns";
import PropTypes from "prop-types";

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm";

const DropdownMenu = ({isOpen, setIsOpen}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categoryArray = Object.keys(Categories).map((key) => Categories[key]);
  const numColumns = useMenuColumns();
  
  const columnSize = Math.ceil(categoryArray.length / numColumns);
  const columns = Array.from({ length: numColumns }, (_, index) =>
    categoryArray.slice(index * columnSize, (index + 1) * columnSize)
  );

  return (
    <div
      className="p-4 relative inline-block "
      onMouseEnter={() => setIsCategoryOpen(!isCategoryOpen)}
      onMouseLeave={() => setIsCategoryOpen(!isCategoryOpen)}
    >
      <button onClick={() => setIsCategoryOpen(!isCategoryOpen)}>Productos</button>
      {isCategoryOpen && (
        <div
          className="bg-white flex absolute mt-2 w-fit sm:w-max rounded shadow-lg py-1 z-10 -m-24 -translate-x-1 sm:-ml-36 md:-ml-12 overflow-y-auto"
          style={{maxHeight: "calc(100vh - 170px)"}}
          onClick={() =>{setIsCategoryOpen(!isCategoryOpen)}} 
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="w-40 md:w-1/3">
              {column.map((category) => (
                <Link
                  key={category.name}
                  className={SubMenu}
                  to={`/cacharreria_cosas_bonitas/${category.name}/`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default DropdownMenu;
