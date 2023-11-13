import { useState, useContext, useRef } from "react";
import CategoryContext from "./CategoryContext";
import Swal from "sweetalert2";
import {
  deleteCategory,
  createCategory,
  uploadCategoryImage,
  updateCategoryWithImage
} from "../../../config/api/apiUtils";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const { categories, addCategory, removeCategory, updateCategory } =
    useContext(CategoryContext);
  const [categoryImage, setCategoryImage] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const fileInputRef = useRef(null);

  const handleEditCategory = (category) => {
    Swal.fire({
      title: 'Editar Categoría',
      html: `
        <input id="swal-input1" class="mx-0 w-96 swal2-input" placeholder="Nombre" value="${category.name || ''}">
        <input type="file" id="swal-input2" class="mx-0 w-96 swal2-file" accept="image/*">
      `,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const picture = document.getElementById('swal-input2').files[0];
  
        if (!name) {
          Swal.showValidationMessage('El nombre de la categoría no puede estar vacío.');
          return false;
        }
  
        return { name, picture };
      },
      didOpen: () => {
        document.getElementById('swal-input1').focus();
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('name', result.value.name);
        if (result.value.picture) {
          formData.append('picture', result.value.picture);
        }

          await updateCategoryWithImage(category._id, formData)
          .then((updatedCategory) => {
            // Aquí se actualiza el contexto con la categoría actualizada
            updateCategory(updatedCategory);
  
            Swal.fire({
              title: '¡Categoría actualizada!',
              icon: 'success'
            });
          })
          .catch((error) => {
            console.error('Error al actualizar la categoría:', error);
            Swal.fire({
              title: 'Error al actualizar la categoría',
              text: error.toString(),
              icon: 'error'
            });
          });
      }
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Está seguro de que desea eliminar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteCategory(id);
      removeCategory(id);
      Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
    }
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
      // Primero se sube la imagen
      const imageResponse = await uploadCategoryImage(categoryImage);

      // Luego se crea la categoría con el nombre y la URL de la imagen
      const newCategory = await createCategory({
        name: newCategoryName,
        picture: imageResponse.imageUrl,
      });

      //Se actualiza el estado local con la nueva categoría
      addCategory(newCategory);

      // Se limpian los inputs
      setNewCategoryName("");
      setCategoryImage(null);
      // Se restablece el campo de entrada de archivo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 py-8">
      <div className="w-full max-w-2xl p-6 mb-6 bg-white rounded-xl shadow-lg">
        <Link to="/cacharreria_cosas_bonitas/Admin/productos">
          <button className="mt-4 w-full active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
            Administrar Productos
          </button>
        </Link>
      </div>
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">
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
            ref={fileInputRef}
          />
          <button
            className="mt-4 w-full active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
            onClick={handleAddCategory}
          >
            Agregar Categoría
          </button>
        </div>
      </div>
      <div className="w-full max-w-3xl p-6 m-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
        <table className="bg-white  w-full rounded-md shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Nombre de la categoría</th>
              <th className="py-2 px-4">Imagen</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{cat.name}</td>
                <td className=" py-2 px-4">
                  <img
                    src={cat.picture}
                    alt={cat.name}
                    className="m-auto w-12 h-12"
                  />
                </td>
                <td className="py-4 px-4 flex justify-around">
                  <button
                    onClick={() => handleEditCategory(cat)}
                    className=" py-1 px-3 rounded-md shadow-md bg-blue-700 hover:bg-blue-800 text-white focus:outline-none transition duration-150 ease-in-out"
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
      </div>
    </div>
  );
};

export default CategoryList;
