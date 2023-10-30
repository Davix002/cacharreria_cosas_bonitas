import { useState, useEffect } from "react";
import CategoryForm from "./CategoryForm";
import {
  getCategories,
  deleteCategory,
  createCategory,
  uploadCategoryImage,
} from "../../../config/api/apiUtils";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta categoría?")) {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat._id !== id));
    }
  };

  const handleFormSubmit = (updatedCategory) => {
    if (updatedCategory && updatedCategory._id) {
      const updatedCategories = categories.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      );
      setCategories(updatedCategories);
    }
    setSelectedCategory(null);
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "") {
      alert("El nombre de la categoría no puede estar vacío.");
      return;
    }

    if (!categoryImage) {
      alert("Por favor, selecciona una imagen para la categoría.");
      return;
    }

    try {
      // Primero sube la imagen
      const imageResponse = await uploadCategoryImage(categoryImage);

      // Luego crea la categoría con el nombre y la URL de la imagen
      const newCategory = await createCategory({
        name: newCategoryName,
        picture: imageResponse.imageUrl,
      });

      // Actualiza el estado local con la nueva categoría
      setCategories([...categories, newCategory]);

      // Limpia los inputs
      setNewCategoryName("");
      setCategoryImage(null);
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md place-items-center shadow-md w-full flex flex-col justify-center items-center">
      {
        <>
          <div className="w-2/4 mb-4">
            <input
              className="border p-2 w-full"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la nueva categoría"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <button
              className="bg-blue-600 text-white p-2 mt-2 rounded w-full"
              onClick={handleAddCategory}
            >
              Agregar Categoría
            </button>
          </div>
          <table className="bg-white  w-2/4 rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Nombre de la categoría</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-100">
                  <td className="border-t py-2 px-4">{cat.name}</td>
                  <td className="border-t py-2 px-4 just flex justify-around">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsModalOpen(true);
                      }}
                      className="mr-2 rounded-md shadow-md text-romTurquoise-600 hover:text-blue-800 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className=" rounded-md shadow-md text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-md shadow-lg relative w-2/4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-2 right-2"
                >
                  X
                </button>
                <CategoryForm
                  categoryToUpdate={selectedCategory}
                  onFormSubmit={(updatedCategory) => {
                    handleFormSubmit(updatedCategory);
                    setIsModalOpen(false);
                  }}
                />
              </div>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default CategoryList;
