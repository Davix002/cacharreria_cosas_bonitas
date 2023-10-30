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
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>Nombre de la categoria</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                value={category.name || ""}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                placeholder="Nombre de la categoría"
              />
            </td>
            <td>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">Guardar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

CategoryForm.propTypes = {
  categoryToUpdate: PropTypes.object,
  onFormSubmit: PropTypes.func.isRequired,
};

export default CategoryForm;
