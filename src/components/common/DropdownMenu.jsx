import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../config/api/apiUtils";
import useMenuColumns from "./useMenuColumns";
import PropTypes from "prop-types";
import Spinner from "../pages/Inicio/Spinner";

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm";

const DropdownMenu = ({isOpen, setIsOpen}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    })();
  }, []);

  const numColumns = useMenuColumns();

  if (loading) {
    return <Spinner />;
  }
  
  const columnSize = Math.ceil(categories.length / numColumns);
  const columns = Array.from({ length: numColumns }, (_, index) =>
    categories.slice(index * columnSize, (index + 1) * columnSize)
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
