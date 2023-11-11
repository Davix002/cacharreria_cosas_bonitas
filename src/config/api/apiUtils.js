export async function fetchProductsByCategory(categoryId) {
  try {
    const response = await fetch(
      `http://localhost:5800/api/products/category/${categoryId}`
    );
    const productsData = await response.json();

    const products = productsData.map((product) => ({
      id: product._id,
      name: product.name,
      thumbnail: product.thumbnail,
      brand: product.brand || "Cosas Bonitas",
      price: product.price,
      imageAlt: product.name,
    }));
    return products;
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
    return [];
  }
}

export async function getProducts() {
  const url = "http://localhost:5800/api/products/";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productsData = await response.json();

    const products = productsData.map((product) => ({
      _id: product._id,
      name: product.name,
      categoryIds: product.categoryIds,
      thumbnail: product.thumbnail,
      brand: product.brand || "Cosas Bonitas",
      price: product.price || 100000,
      imageAlt: product.name,
    }));
    return products;
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return [];
  }
}

export async function createProduct(productData) {
  const response = await fetch("http://localhost:5800/api/products/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al crear el producto");
  }

  return await response.json();
}

export async function createProductWithImage(formData) {
  const response = await fetch("http://localhost:5800/api/products/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al crear el producto");
  }

  return await response.json();
}

export async function updateProductWithImage(id, formData) {
  const response = await fetch(`http://localhost:5800/api/products/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al actualizar el producto");
  }

  return await response.json();
}

export async function uploadProductImage(image) {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("http://localhost:5800/api/products/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al subir la imagen");
  }

  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`http://localhost:5800/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al eliminar el producto");
  }

  return await response.json();
}

export async function registrar({ nombre, password, email, navigate }) {
  const baseUrl = window.location.origin;
  try {
    const response = await fetch(`http://localhost:5800/api/usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        password: password,
        email: email,
        baseUrl: baseUrl,
      }),
    });
    const data = await response.json();

    if (data._id) {
      // Si se devuelve un ID, el registro fue exitoso
      navigate("/cacharreria_cosas_bonitas/espera-confirmacion");
    } else {
      console.error("Error en el registro:", data);
    }
  } catch (error) {
    console.error("Error al registrar:", error);
  }
}

// PARA LAS CATEGORIAS

export async function fetchCategories() {
  try {
    const response = await fetch(`http://localhost:5800/api/categories`);
    const data = await response.json();

    const categories = data.map((category) => ({
      id: category._id,
      name: category.name,
      picture: category.picture,
      imageAlt: category.name,
    }));

    return categories;
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
    return [];
  }
}

export async function createCategory(categoryData) {
  const response = await fetch("http://localhost:5800/api/categories/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al crear la categoría");
  }

  return await response.json();
}

export async function getCategories() {
  const response = await fetch("http://localhost:5800/api/categories");
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al obtener las categorías");
  }
  return await response.json();
}

export async function updateCategoryWithImage(id, formData) {
  const response = await fetch(`http://localhost:5800/api/categories/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al actualizar la categoría");
  }

  return await response.json();
}

export async function createCategoryWithImage(formData) {
  const response = await fetch("http://localhost:5800/api/categories/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al crear la categoría");
  }

  return await response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`http://localhost:5800/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al eliminar la categoría");
  }

  return await response.json();
}

export async function uploadCategoryImage(image) {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("http://localhost:5800/api/categories/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al subir la imagen");
  }

  return await response.json();
}

export async function cambioContrasena({ email, navigate }) {
  const baseUrl = window.location.origin;
  try {
    const response = await fetch(
      `http://localhost:5800/api/usuarios/olvide-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          baseUrl: baseUrl,
        }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate("/cacharreria_cosas_bonitas/espera-confirmacion");
    } else {
      if (data && data.msg) {
        alert(data.msg);
      } else {
        console.error("Error en el proceso:", data);
      }
    }
  } catch (error) {
    console.error("Error al procesar:", error);
  }
}

export async function FormularioReestablecerContrasena(
  password,
  token,
  navigate
) {
  try {
    // Se agrega el token a la URL
    const response = await fetch(
      `http://localhost:5800/api/usuarios/olvide-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      navigate("/cacharreria_cosas_bonitas/Login/");
      return { success: true, message: data.msg };
    } else {
      return { success: false, message: data.msg || "Error en el proceso." };
    }
  } catch (error) {
    console.error("Error al procesar:", error);
    return { success: false, message: "Error al procesar la solicitud." };
  }
}

//Carrito

export const getCartItems = async (token) => {
  if (!token) {
    console.error("No se proporcionó token de autenticación.");
    return { products: [], total: 0 };
  }

  try {
    const response = await fetch("http://localhost:5800/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const products = data.items.map((item) => ({
      id: item.productId._id,
      cartItemId: item._id,
      name: item.productId.name,
      price: item.productId.price,
      brand: item.productId.brand,
      imageSrc: item.productId.thumbnail,
      quantity: item.quantity,
    }));

    const total = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    return { products, total };
  } catch (error) {
    console.error("Hubo un error al obtener los productos del carrito:", error);
    return { products: [], total: 0 };
  }
};

export const addProductToCart = async (usuario, product) => {
  const response = await fetch("http://localhost:5800/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usuario.email,
      userID: usuario._id,
      productID: product.id,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo agregar el producto al carrito.");
  }

  return await response.json();
};

export const deleteProductFromCart = async (cartItemId) => {
  try {
    const response = await fetch(
      `http://localhost:5800/api/cart/item/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Hubo un error al eliminar el producto:", error);
    return false;
  }
};

export const increaseQuantity = async (products, cartItemId) => {
  const product = products.find((prod) => prod.cartItemId === cartItemId);
  if (!product) return products;

  const newQuantity = product.quantity + 1;

  try {
    const response = await fetch(
      `http://localhost:5800/api/cart/item/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      }
    );

    const updatedItem = await response.json();

    const updatedProducts = products.map((prod) =>
      prod.cartItemId === cartItemId
        ? { ...prod, quantity: updatedItem.quantity }
        : prod
    );

    return updatedProducts;
  } catch (error) {
    console.error("Error al aumentar la cantidad:", error);
    return products;
  }
};

export const decreaseQuantity = async (products, cartItemId) => {
  const product = products.find((prod) => prod.cartItemId === cartItemId);
  if (!product || product.quantity <= 1) return products;

  const newQuantity = product.quantity - 1;

  try {
    const response = await fetch(
      `http://localhost:5800/api/cart/item/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      }
    );

    const updatedItem = await response.json();

    const updatedProducts = products.map((prod) =>
      prod.cartItemId === cartItemId
        ? { ...prod, quantity: updatedItem.quantity }
        : prod
    );

    return updatedProducts;
  } catch (error) {
    console.error("Error al disminuir la cantidad:", error);
    return products;
  }
};

export const updateProductQuantity = async (products, cartItemId, quantity) => {
  const product = products.find((prod) => prod.cartItemId === cartItemId);
  if (!product) return products;

  try {
    const response = await fetch(
      `http://localhost:5800/api/cart/item/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: quantity }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedItem = await response.json();

    return updatedItem;
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
    return null;
  }
};
