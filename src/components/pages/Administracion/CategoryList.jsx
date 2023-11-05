import { useState, useContext } from "react";
import CategoryForm from "./CategoryForm";
import CategoryContext from "./CategoryContext";
import {
  deleteCategory,
  createCategory,
  uploadCategoryImage,
} from "../../../config/api/apiUtils";

const CategoryList = () => {
  const { categories, addCategory, removeCategory, updateCategory } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta categoría?")) {
      await deleteCategory(id);
      removeCategory(id);
    }
  };

  const handleFormSubmit = (updatedCategory) => {
    if (updatedCategory && updatedCategory._id) {
      updateCategory(updatedCategory);
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
      addCategory(newCategory);

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
    <div className="flex items-center justify-center bg-gray-200 py-8">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full mb-4">
            <label className="block text-lf font-medium mb-1">
              Nombre de la nueva categoría
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ingrese el nombre de la categoría"
            />
            <label className="block text-lf font-medium mb-1">
              Imagen de la nueva categoría
            </label>
            <input
              className="mt-2 w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              className="mt-4 w-full active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
              onClick={handleAddCategory}
            >
              Agregar Categoría
            </button>
          </div>
          <table className="bg-white  w-full rounded-md shadow-md overflow-hidden">
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
                      className="mr-2 py-1 px-3 rounded-md shadow-md bg-blue-700 hover:bg-blue-800 text-white focus:outline-none transition duration-150 ease-in-out"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="py-1 px-3 rounded-md shadow-md bg-red-600 hover:bg-red-700 text-white focus:outline-none transition duration-150 ease-in-out"
                    >
                      Eliminar
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
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
