const API_URL = "http://localhost:5000";

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
