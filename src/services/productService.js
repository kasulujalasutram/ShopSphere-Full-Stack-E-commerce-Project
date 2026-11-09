
import API from "./api";

// Get all products
export const getProducts = async () => {
  const response = await API.get("products/");
  return response.data;
};

// Get one product by ID
export const getProductById = async (productId) => {
  const response = await API.get(`products/${productId}/`);
  return response.data;
};

// Get all categories
export const getCategories = async () => {
  const response = await API.get("categories/");
  return response.data;
};

// Add a new product
export const createProduct = async (productData) => {
  const response = await API.post("products/", productData);
  return response.data;
};

// Update an existing product
export const updateProductAPI = async (productId, productData) => {
  const response = await API.patch(
    `products/${productId}/`,
    productData
  );
  return response.data;
};

// Delete a product
export const deleteProductAPI = async (productId) => {
  const response = await API.delete(`products/${productId}/`);
  return response.data;
};
