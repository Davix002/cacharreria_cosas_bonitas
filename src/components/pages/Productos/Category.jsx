import { useState, useEffect } from "react";
import Product_grid from "./Product_grid";
import PropTypes from "prop-types";
import { fetchProductsByCategory } from "../Api/apiUtils";

const Category = ({ categoryId, nombre_categoria }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedProducts = await fetchProductsByCategory(categoryId);
      setProducts(fetchedProducts);
    })();
  }, [categoryId]);

  return (
    <div>
      <Product_grid products={{ category: nombre_categoria, array_products: products }} />
    </div>
  );
};

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
  nombre_categoria: PropTypes.string.isRequired,
};

export default Category;
