import { useState, useContext, useRef } from "react";
import ProductContext from "../Administracion/ProductContext";
import CategoryContext from "./CategoryContext";
import Swal from "sweetalert2";
import {
  createProduct,
  uploadProductImage,
  deleteProduct,
  updateProductWithImage,
} from "../../../config/api/apiUtils";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductList = () => {
  const { products, addProduct, removeProduct, updateProduct } =
    useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const [productImage, setProductImage] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategories, setNewProductCategories] = useState([]);
  const fileInputRef = useRef(null);

  const handleEditProduct = (product) => {
    let htmlContent = `
    <input id="swal-input1" class="mx-0 mb-2 mt-1 w-96 swal2-input" placeholder="Nombre" value="${
      product.name || ""
    }">
    <input id="swal-input2" class="mx-0 my-2 w-96 swal2-input" placeholder="Marca" value="${
      product.brand || ""
    }">
    <input id="swal-input3" class="mx-0 my-2 w-96 swal2-input" placeholder="Precio" type="number" value="${
      product.price || ""
    }">
    <select id="swal-input4" class="mx-0 my-2 w-96 swal2-select" multiple>`;

    categories.forEach((category) => {
      htmlContent += `<option value="${category._id}" ${
        product.categoryIds.includes(category._id) ? "selected" : ""
      }>${category.name}</option>`;
    });

    htmlContent += `</select>
    <input type="file" id="swal-input5" class="mx-0 mt-2 mb-1 w-96 swal2-file" accept="image/*">`;

    Swal.fire({
      title: "Editar Producto",
      html: htmlContent,
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        const brand = document.getElementById("swal-input2").value;
        const price = document.getElementById("swal-input3").value;
        const categorySelect = document.getElementById("swal-input4");
        const selectedCategories = Array.from(categorySelect.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        const thumbnail = document.getElementById("swal-input5").files[0];

        if (!name) {
          Swal.showValidationMessage(
            "El nombre del producto no puede estar vacío."
          );
          return false;
        }

        if (!brand) {
          Swal.showValidationMessage(
            "La marca del producto no puede estar vacía."
          );
          return false;
        }

        if (!price) {
          Swal.showValidationMessage(
            "El precio del producto no puede estar vacío."
          );
          return false;
        }

        return {
          name,
          brand,
          price,
          categoryIds: selectedCategories,
          thumbnail,
        };
      },
      didOpen: () => {
        document.getElementById("swal-input1").focus();
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", result.value.name);
        formData.append("brand", result.value.brand);
        formData.append("price", result.value.price);
        result.value.categoryIds.forEach((categoryId) => {
          formData.append("categoryIds", categoryId);
        });
        if (result.value.thumbnail) {
          formData.append("thumbnail", result.value.thumbnail);
        }

        try {
          const updatedProduct = await updateProductWithImage(
            product._id,
            formData
          );
          updateProduct(updatedProduct);
          Swal.fire({
            title: "¡Producto actualizado!",
            icon: "success",
          });
        } catch (error) {
          console.error("Error al actualizar el producto:", error);
          Swal.fire({
            title: "Error al actualizar el producto",
            text: error.toString(),
            icon: "error",
          });
        }
      }
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Está seguro de que desea eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteProduct(id);
      removeProduct(id);
      Swal.fire("Eliminado", "El producto ha sido eliminada.", "success");
    }
  };

  const handleAddProduct = async () => {
    if (newProductName.trim() === "") {
      alert("El nombre del producto no puede estar vacío.");
      return;
    }

    if (!productImage) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    if (newProductBrand.trim() === "") {
      alert("La marca del producto no puede estar vacía.");
      return;
    }
    if (newProductPrice.trim() === "") {
      alert("El precio del producto no puede estar vacío.");
      return;
    }
    if (newProductCategories.length === 0) {
      alert("Debe seleccionar al menos una categoría para el producto.");
      return;
    }

    try {
      // Primero se sube la imagen
      const imageResponse = await uploadProductImage(productImage);

      // Luego se crea la categoría con el nombre y la URL de la imagen
      const newProduct = await createProduct({
        name: newProductName,
        thumbnail: imageResponse.imageUrl,
        brand: newProductBrand,
        price: newProductPrice,
        categoryIds: newProductCategories,
      });

      // Se actualiza el estado local con la nueva categoría
      addProduct(newProduct);

      //  Se limpian los inputs
      setNewProductName("");
      setNewProductBrand("");
      setNewProductPrice("");
      setProductImage(null);
      setNewProductCategories([]);
      // Se restablece el campo de entrada de archivo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewProductCategories(selectedOptions);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 py-8">
      <div className="w-full max-w-2xl p-6 mb-6 bg-white rounded-xl shadow-lg">
        <Link to="/cacharreria_cosas_bonitas/Admin/categorias/">
          <button className="mt-4 w-full active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold">
            Administrar Categorias
          </button>
        </Link>
      </div>
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">
        <div className="w-full mb-6">
          <label className="block text-lf font-medium mb-1">
            Nombre del nuevo producto
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="Ingrese el nombre del producto"
          />
          <label className="block text-lf font-medium mb-1">
            Marca del nuevo producto
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
            value={newProductBrand}
            onChange={(e) => setNewProductBrand(e.target.value)}
            placeholder="Ingrese la marca del producto"
          />
          <label className="block text-lf font-medium mb-1">
            Precio del nuevo producto
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            placeholder="Ingrese el precio del producto"
          />
          <label className="block text-lf font-medium mb-1">
            Categorías del nuevo producto
          </label>
          <select
            className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
            multiple={true}
            value={newProductCategories}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="block text-lf font-medium mb-1">
            Imagen del nuevo producto
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
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
        </div>
      </div>
      <div className="w-full max-w-6xl p-6 m-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
        <table className="bg-white w-full rounded-md shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Nombre del producto</th>
              <th className="py-2 px-4">Marca</th>
              <th className="py-2 px-4">Precio</th>
              <th className="py-2 px-4">Categorías</th>
              <th className="py-2 px-4">Imagen</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{prod.name}</td>
                <td className="py-2 px-4">{prod.brand}</td>
                <td className="py-2 px-4 text-right">
                  {formatPrice(prod.price)}
                </td>
                <td className="py-2 px-4">
                  {prod.categoryIds.map((category) => category.name).join(", ")}
                </td>
                <td className="py-2 px-4">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    className="m-auto w-12 h-12"
                  />
                </td>
                <td className="py-4 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(prod)}
                    className="py-1 px-3 rounded-md shadow-md bg-blue-700 hover:bg-blue-800 text-white focus:outline-none transition duration-150 ease-in-out"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
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

export default ProductList;
