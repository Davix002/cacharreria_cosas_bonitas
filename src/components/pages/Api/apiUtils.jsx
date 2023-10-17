export async function fetchCategories() {
  try {
    const response = await fetch(`http://localhost:5800/api/categories`);
    const data = await response.json();
  
    const categories = data.map((category, index) => ({
      id: index,
      name: category.name,
      imageSrc: category.picture,
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
      `https://api.mercadolibre.com/sites/MCO/search?category=${categoryId}`
    );
    const data = await response.json();

    const products = data.results.map((product, index) => ({
      id: index,
      name: product.title,
      imageSrc: product.thumbnail,
      price: product.price,
      brand: product.attributes[0].value_name || "Marca no disponible",
      href: product.permalink,
      imageAlt: product.title,
      quantity: product.available_quantity,
      ratings: product.reviews?.rating_average || "Sin calificaciones",
    }));
    return products;
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
    return [];
  }
}