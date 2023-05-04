import { useState, useEffect } from "react";
import Imagen_principal from "./Imagen_principal";
import CategoriesCarousel from "./CategoriesCarousel";
import { fetchCategories } from "../Api/apiUtils";

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
      <CategoriesCarousel categories={categories} />
    </div>
  );
};

export default Inicio;
