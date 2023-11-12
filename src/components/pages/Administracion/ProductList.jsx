import { useState, useContext, useRef } from "react";
import ProductForm from "./ProductForm";
import ProductContext from "../Administracion/ProductContext";
import CategoryContext from "./CategoryContext";
import Swal from 'sweetalert2';
import {
  createProduct,
  uploadProductImage,
  deleteProduct,
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategories, setNewProductCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Está seguro de que desea eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      await deleteProduct(id);
      removeProduct(id);
      Swal.fire(
        'Eliminado',
        'El producto ha sido eliminada.',
        'success'
      );
    }
  };

  const handleFormSubmit = (updatedProduct) => {
    if (updatedProduct && updatedProduct._id) {
      updateProduct(updatedProduct);
    }
    setSelectedProduct(null);
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
                <td className="border-t py-2 px-4">{prod.name}</td>
                <td className="border-t py-2 px-4">{prod.brand}</td>
                <td className="border-t py-2 px-4 text-right">{formatPrice(prod.price)}</td>
                <td className="border-t py-2 px-4">
                  {prod.categoryIds.map((category) => category.name).join(", ")}
                </td>
                <td className="border-t py-2 px-4">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td className="border-t py-2 px-4 just flex justify-around">
                  <button
                    onClick={() => {
                      setSelectedProduct(prod);
                      setIsModalOpen(true);
                    }}
                    className="mr-2 py-1 px-3 rounded-md shadow-md bg-blue-700 hover:bg-blue-800 text-white focus:outline-none transition duration-150 ease-in-out"
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

        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-lg relative w-2/4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2"
              >
                X
              </button>
              <ProductForm
                productToUpdate={selectedProduct}
                onFormSubmit={(updatedProduct) => {
                  handleFormSubmit(updatedProduct);
                  setIsModalOpen(false);
                }}
                categories={categories}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
