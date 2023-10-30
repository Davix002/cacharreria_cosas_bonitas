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

export async function registrar({ nombre, password, email, navigate }) {
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
      }),
    });
    const data = await response.json();

    if (data._id) {
      // Asumimos que si se devuelve un ID, el registro fue exitoso
      navigate("/cacharreria_cosas_bonitas/espera-confirmacion");
    } else {
      console.error("Error en el registro:", data);
    }
  } catch (error) {
    console.error("Error al registrar:", error);
  }
}

// PARA LAS CATEGORIAS''

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

export async function getCategory(id) {
  const response = await fetch(`http://localhost:5800/api/categories/${id}`);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Error al obtener la categoría");
  }
  return await response.json();
}

export async function updateCategoryWithImage(id, formData) {
  const response = await fetch(`http://localhost:5800/api/categories/${id}`, {
      method: "PUT",
      body: formData, // Nota: no establezcas headers aquí
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
      body: formData, // Nota: no establezcas headers aquí
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
        }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate("/cacharreria_cosas_bonitas/espera-confirmacion");
    } else {
      if (data && data.msg) {
        alert(data.msg); // Muestra un mensaje de error al usuario si el backend lo proporciona
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
    // Asegurándose de que el token se añade correctamente a la URL
    const response = await fetch(
      `http://localhost:5800/api/usuarios/olvide-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password, // Enviando la contraseña en el cuerpo de la petición
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
