import { useState, useEffect } from "react";
import Product_grid from "./Product_grid";
import PropTypes from "prop-types";
import { fetchProductsByCategory, fetchCategories } from "../../../config/api/apiUtils";

const Category = ({ categoryId, nombre_categoria }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedProducts = await fetchProductsByCategory(categoryId);
      setProducts(fetchedProducts);
    })();
  }, [categoryId]);

  // Fetch all categories
  useEffect(() => {
    (async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    })();
  }, []);

  return (
    <div>
      {categories.length > 0 && (
        <Product_grid 
          products={{ category: nombre_categoria, array_products: products }}
          currentCategoryId={categoryId}
          categories={categories}
        />
      )}
    </div>
  );
};

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
  nombre_categoria: PropTypes.string.isRequired,
};

export default Category;
