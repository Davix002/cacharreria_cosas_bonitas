import { useState, useEffect } from "react";
import Product_grid from "./Product_grid";
import PropTypes from "prop-types";

/* const MERCADO_LIBRE_API_KEY = "xqmM80FutxvGRHqTX3zIVXHsSxfHSW9o"; */

async function fetchProductsByCategory(categoryId) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MCO/search?category=${categoryId}`
    );
    const data = await response.json();

    const products = data.results.map((product, index) => ({
      id: index,
      name: product.title,
      imageSrc: product.thumbnail,
      price: product.price,
      brand: product.attributes[0].value_name || "Marca no disponible",
      href: product.permalink,
      imageAlt: product.title,
      quantity: product.available_quantity,
      ratings: product.reviews?.rating_average || "Sin calificaciones",
    }));
    return products;
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
    return [];
  }
}

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
