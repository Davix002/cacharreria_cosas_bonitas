import { useState, useContext } from "react";
import ProductForm from "./ProductForm";
import ProductContext from "../Administracion/ProductContext";
import {
  getProducts
} from "../../../config/api/apiUtils";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, addProduct, removeProduct, updateProduct } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      await deleteProduct(id);
      removeProduct(id);
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

    try {
      // Primero sube la imagen
      const imageResponse = await uploadProductImage(productImage);

      // Luego crea la categoría con el nombre y la URL de la imagen
      const newProduct = await createProduct({
        name: newProductName,
        picture: imageResponse.imageUrl,
      });

      // Actualiza el estado local con la nueva categoría
      addProduct(newProduct);

      // Limpia los inputs
      setNewProductName("");
      setProductImage(null);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 py-8">

      <div className="w-full max-w-2xl p-6 mb-6 bg-white rounded-xl shadow-lg">
        <Link to="/cacharreria_cosas_bonitas/Admin/productos">
          <button
            className="mt-4 w-full active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
          >
            Administrar Productos
          </button>
        </Link>
      </div>
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full mb-4">
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
              Imagen del nuevo producto
            </label>
            <input
              className="mt-2 w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              className="mt-4 w-full active:scale-[.98] active:duration transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-romTurquoise-600 text-white text-lg font-bold"
              onClick={handleAddProduct}
            >
              Agregar Producto
            </button>
          </div>
          <table className="bg-white  w-full rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Nombre del producto</th>
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
                        setSelectedProduct(cat);
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
                <ProductForm
                  productToUpdate={selectedProduct}
                  onFormSubmit={(updatedProduct) => {
                    handleFormSubmit(updatedProduct);
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

export default ProductList;
