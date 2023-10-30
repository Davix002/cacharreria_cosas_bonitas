import React, { useState } from 'react';
import { createCategory, updateCategory } from '../../../config/api/apiUtils';
const CategoryForm = ({ categoryToUpdate, onFormSubmit }) => {
  const [category, setCategory] = useState(categoryToUpdate || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category._id) {
      await updateCategory(category._id, category);
    } else {
      await createCategory(category);
    }
    onFormSubmit();
  }

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
                value={category.name || ''}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                placeholder="Nombre de la categoría"
              />
            </td>
            <td>
              <button type="submit">Guardar</button>
            </td>

          </tr>

        </tbody>
      </table>





    </form>
  );
}

export default CategoryForm;
