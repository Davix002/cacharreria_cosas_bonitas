import Imagen_principal from "../components/Imagen_principal";
import ProductCarousel from "../components/ProductCarousel";
import { useState, useEffect } from "react";
import localCategories from "../data/categories";

async function fetchCategoryImage(categoryId) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/categories/${categoryId}`);
    const data = await response.json();

    const llamadaImagen = await fetch(data.picture);
    
    if (llamadaImagen.ok) {
      return data.picture;
    } else {
      const localCategory = localCategories[categoryId];

      if (localCategory && localCategory.picture) {
        return localCategory.picture;
      }
    }
  } catch (error) {
    console.error(`Error al buscar la imagen de la categoría ${categoryId}:`, error);
  }

  return "";
}

async function fetchCategories() {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MCO/categories`);
    const data = await response.json();
    const images = await Promise.all(data.map((category) => fetchCategoryImage(category.id)));

    const categories = data.map((category, index) => ({
      id: index,
      name: category.name,
      imageSrc: images[index],
      imageAlt: category.name,
    }));

    return categories;
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
    return [];
  }
}

const Inicio = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Imagen_principal className="z-0" />
      <ProductCarousel categories={categories} />
    </div>
  );
};

export default Inicio;