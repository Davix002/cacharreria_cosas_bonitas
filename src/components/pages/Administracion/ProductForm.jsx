import { useState } from "react";
import PropTypes from "prop-types";

import { updateProductWithImage,createProductWithImage } from "../../../config/api/apiUtils";
const ProductForm = ({ productToUpdate, onFormSubmit }) => {
  const [product, setProduct] = useState(productToUpdate || {});
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    if (newImage) {
        formData.append('image', newImage);
    } else if (product.picture) {
        formData.append('thumbnail', product.picture);
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
};

export default ProductForm;
