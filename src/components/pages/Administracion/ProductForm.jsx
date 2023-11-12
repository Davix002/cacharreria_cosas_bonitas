import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateProductWithImage, createProductWithImage } from "../../../config/api/apiUtils";

const ProductForm = ({ productToUpdate, onFormSubmit, categories  }) => {
  const [product, setProduct] = useState(productToUpdate || {});
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (productToUpdate) {
      setProduct(productToUpdate);
    }
  }, [productToUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setProduct({ ...product, categoryIds: selectedOptions });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('brand', product.brand);
    formData.append('price', product.price);
    if (product.categoryIds) {
      product.categoryIds.forEach((id) => formData.append('categoryIds', id));
    }
    if (newImage) {
      formData.append('image', newImage);
    } else if (product.thumbnail) {
      formData.append('thumbnail', product.thumbnail);
    }

    let updatedProduct;
    if (product._id) {
      updatedProduct = await updateProductWithImage(product._id, formData);
    } else {
      updatedProduct = await createProductWithImage(formData);
    }

    onFormSubmit(updatedProduct);
  };


  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label className="block text-lf font-medium mb-1">
          Nombre del producto
        </label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
          value={product.name || ""}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Ingrese el nombre del producto"
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
      <div className="mb-4">
        <label className="block text-lf font-medium mb-1">
          Marca del producto
        </label>
        <input
          name="brand"
          className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
          value={product.brand || ""}
          onChange={handleInputChange}
          placeholder="Ingrese la marca del producto"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lf font-medium mb-1">
          Precio del producto
        </label>
        <input
          name="price"
          type="number"
          className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
          value={product.price || ""}
          onChange={handleInputChange}
          placeholder="Ingrese el precio del producto"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lf font-medium mb-1">
          Categorías del producto
        </label>
        <select
          name="categoryIds"
          className="w-full border-2 border-gray-100 rounded-xl p-2 bg-transparent"
          multiple={true}
          value={product.categoryIds || []}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
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

ProductForm.propTypes = {
  productToUpdate: PropTypes.object,
  onFormSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default ProductForm;
