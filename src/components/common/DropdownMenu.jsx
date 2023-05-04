import { useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../../data/categories";

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryArray = Object.keys(Categories).map((key) => Categories[key]);
  const numColumns = 3;
  const columnSize = Math.ceil(categoryArray.length / numColumns);
  const columns = Array.from({ length: numColumns }, (_, index) =>
    categoryArray.slice(index * columnSize, (index + 1) * columnSize)
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
                <Link
                  key={category.name}
                  className={SubMenu}
                  to={`/cacharreria_cosas_bonitas/${category.name}/`}
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

export default DropdownMenu;
