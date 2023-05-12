import { useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../../data/categories";
import useMenuColumns from "./useMenuColumns";

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryArray = Object.keys(Categories).map((key) => Categories[key]);
  const numColumns = useMenuColumns();

  
  const columnSize = Math.ceil(categoryArray.length / numColumns);
  const columns = Array.from({ length: numColumns }, (_, index) =>
    categoryArray.slice(index * columnSize, (index + 1) * columnSize)
  );

  return (
    <div
      className="p-4 relative inline-block "
      onMouseEnter={() => setIsOpen(!isOpen)}
      onMouseLeave={() => setIsOpen(!isOpen)}
    >
      <button onClick={() => setIsOpen(!isOpen)}>Productos (API)</button>
      {isOpen && (
        <div
          className="flex absolute mt-2 w-max rounded bg-white shadow-lg py-1 z-10 -ml-12 sm:-ml-36 overflow-y-auto"
          style={{maxHeight: "calc(100vh - 170px)"}}
          onClick={() => setIsOpen(!isOpen)}
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
