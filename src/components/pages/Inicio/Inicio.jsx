import { useState, useEffect } from "react";
import Imagen_principal from "./Imagen_principal";
import CategoriesCarousel from "./CategoriesCarousel";
import { fetchCategories } from "../../../config/api/apiUtils";
import Spinner from "./Spinner";

const Inicio = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    })();
  }, []);
  
  if (loading) {
    return <Spinner />
  } else {
    return (
      <div className="flex flex-col h-screen">
        <Imagen_principal className="z-0" />
        <CategoriesCarousel categories={categories} />
      </div>
    );
  }
  
};

export default Inicio;
