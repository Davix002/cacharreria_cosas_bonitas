import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm";

const DropdownMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const columnSize = Math.ceil(categories.length / 3);
  const columns = Array.from({ length: 3 }, (_, index) =>
    categories.slice(index * columnSize, (index + 1) * columnSize)
  );

  return (
    <div
      className="p-4 relative inline-block "
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button>Productos</button>
      {isOpen && (
        <div
          className="flex absolute mt-2 w-max rounded bg-white shadow-lg py-1 z-10 -ml-36"
          onClick={() => setIsOpen(false)}
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((category) => (
                <div key={category.name} href="#" className={SubMenu}>
                  <Link to={`/cacharreria_cosas_bonitas/${category.name}`}>{category.name}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default DropdownMenu;