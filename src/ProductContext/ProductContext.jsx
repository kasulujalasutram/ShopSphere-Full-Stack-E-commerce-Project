
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getProducts,
  createProduct,
  updateProductAPI,
  deleteProductAPI,
} from "../services/productService";

const ProductContext = createContext(null);

// Convert Django product data into the frontend format
const formatProduct = (product) => ({
  ...product,
  category: product.category?.name || "Uncategorized",
  price: Number(product.price),
  originalPrice:
    product.original_price !== null &&
    product.original_price !== undefined
      ? Number(product.original_price)
      : null,
  rating: Number(product.rating || 0),
  reviews: Number(product.reviews_count || 0),
  reviewsCount: Number(product.reviews_count || 0),
});

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from Django
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data.map(formatProduct));
    } catch (err) {
      console.error("Product fetch error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add product
  const addProduct = async (productData) => {
    try {
      const payload = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        original_price:
          productData.originalPrice === ""
            ? null
            : productData.originalPrice,
        image: productData.image || "",
        stock: Number(productData.stock || 0),
        rating: Number(productData.rating || 0),
        reviews_count: Number(productData.reviewsCount || 0),
        category_id: Number(productData.category_id),
      };

      const createdProduct = await createProduct(payload);

      setProducts((previous) => [
        formatProduct(createdProduct),
        ...previous,
      ]);

      return createdProduct;
    } catch (err) {
      console.error("Add product error:", err);
      throw err;
    }
  };

  // Update product
  const updateProduct = async (productId, productData) => {
    try {
      const payload = {};

      if (productData.name !== undefined) {
        payload.name = productData.name;
      }

      if (productData.description !== undefined) {
        payload.description = productData.description;
      }

      if (productData.price !== undefined) {
        payload.price = Number(productData.price);
      }

      if (productData.originalPrice !== undefined) {
        payload.original_price =
          productData.originalPrice === ""
            ? null
            : productData.originalPrice;
      }

      if (productData.image !== undefined) {
        payload.image = productData.image;
      }

      if (productData.stock !== undefined) {
        payload.stock = Number(productData.stock);
      }

      if (productData.category_id !== undefined) {
        payload.category_id = Number(productData.category_id);
      }

      const updatedProduct = await updateProductAPI(
        productId,
        payload
      );

      setProducts((previous) =>
        previous.map((product) =>
          product.id === productId
            ? formatProduct(updatedProduct)
            : product
        )
      );

      return updatedProduct;
    } catch (err) {
      console.error("Update product error:", err);
      throw err;
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      await deleteProductAPI(productId);

      setProducts((previous) =>
        previous.filter(
          (product) => product.id !== productId
        )
      );
    } catch (err) {
      console.error("Delete product error:", err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}

export { ProductProvider };
