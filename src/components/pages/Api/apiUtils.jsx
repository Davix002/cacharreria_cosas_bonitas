import localCategories from "../../../data/categories";

export async function fetchCategoryImage(categoryId) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/categories/${categoryId}`);
    const data = await response.json();

    const llamadaImagen = await fetch(data.picture);

    if (llamadaImagen.ok) {
      return data.picture;
    } else {
      return localCategories[categoryId].picture;
    }
  } catch (error) {
    console.error(`Error al buscar la imagen de la categoría ${categoryId}:`, error);
  }

  return "";
}

export async function fetchCategories() {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MCO/categories`);
    const data = await response.json();
    const images = await Promise.all(data.map((category) => fetchCategoryImage(category.id)));

    const categories = data.map((category, index) => ({
      id: index,
      name: category.name,
      imageSrc: images[index],
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