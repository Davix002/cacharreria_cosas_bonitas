import { createContext, useState, useEffect } from 'react';
import { getCategories } from '../../../config/api/apiUtils';
import PropTypes from 'prop-types';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error solicitando las categorías:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Métodos para actualizar las categorías
  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const removeCategory = (id) => {
    setCategories(categories.filter((cat) => cat._id !== id));
  };

  const updateCategory = (updatedCategory) => {
    setCategories(categories.map((cat) =>
      cat._id === updatedCategory._id ? updatedCategory : cat
    ));
  };
  

  return (
    <CategoryContext.Provider value={{ categories, addCategory, removeCategory, updateCategory, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

export default CategoryContext;
