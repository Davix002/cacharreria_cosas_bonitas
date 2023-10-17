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
