import { useState } from "react";
import PropTypes from "prop-types";
import {
  createCategory,
  updateCategory,
  uploadCategoryImage,
} from "../../../config/api/apiUtils";

const CategoryForm = ({ categoryToUpdate, onFormSubmit }) => {
  const [category, setCategory] = useState(categoryToUpdate || {});
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedCategory;
    if (newImage) {
        const imageResponse = await uploadCategoryImage(newImage);
        category.picture = imageResponse.imageUrl;
    }

    if (category._id) {
        updatedCategory = await updateCategory(category._id, category);
    } else {
        updatedCategory = await createCategory(category);
    }
    
    onFormSubmit(updatedCategory);
};

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label className="block text-lf font-medium mb-1">
          Nombre de la categoría
        </label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
          value={category.name || ""}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          placeholder="Ingrese el nombre de la categoría"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lf font-medium mb-1">Imagen</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <button
          type="submit"
          className="active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

CategoryForm.propTypes = {
  categoryToUpdate: PropTypes.object,
  onFormSubmit: PropTypes.func.isRequired,
};

export default CategoryForm;
