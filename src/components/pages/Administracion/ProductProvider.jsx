import { useState, useEffect } from "react";
import { getProducts } from "../../../config/api/apiUtils";
import PropTypes from "prop-types";
import ProductContext from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error solicitando los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Métodos para actualizar los productos
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter((prod) => prod._id !== id));
  };

  const updateProduct = (updatedProduct) => {
    const newProducts = products.map((prod) =>
      prod._id === updatedProduct._id ? updatedProduct : prod
    );
    setProducts(newProducts);
  };  

  return (
    <ProductContext.Provider
      value={{ products, addProduct, removeProduct, updateProduct, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
