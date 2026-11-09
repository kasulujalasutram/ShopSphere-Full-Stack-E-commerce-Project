
import { useEffect, useState } from "react";
import { useProducts } from "../ProductContext/ProductContext.jsx";
import { getCategories } from "../services/productService";

const initialForm = {
  name: "",
  category_id: "",
  description: "",
  price: "",
  originalPrice: "",
  image: "",
  stock: "",
};

function ManageProducts() {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Load categories from Django
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Category loading error:", err);
        setFormError("Unable to load categories.");
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setFormError("");
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Product name is required.");
      return;
    }

    if (!formData.category_id) {
      setFormError("Please select a category.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setFormError("Enter a valid selling price.");
      return;
    }

    if (
      formData.originalPrice !== "" &&
      Number(formData.originalPrice) < Number(formData.price)
    ) {
      setFormError(
        "Original price must be greater than or equal to selling price."
      );
      return;
    }

    if (Number(formData.stock) < 0) {
      setFormError("Stock cannot be negative.");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice:
        formData.originalPrice === ""
          ? null
          : Number(formData.originalPrice),
      stock: Number(formData.stock || 0),
      category_id: Number(formData.category_id),
    };

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateProduct(editingId, productData);
        setMessage("Product updated successfully!");
      } else {
        await addProduct(productData);
        setMessage("Product added successfully!");
      }

      resetForm();
    } catch (err) {
      console.error("Product save error:", err);

      setFormError(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          "Unable to save product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Load product into edit form
  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      category_id: String(
        product.category?.id || product.category_id || ""
      ),
      description: product.description || "",
      price: String(product.price ?? ""),
      originalPrice:
        product.originalPrice === null ||
        product.originalPrice === undefined
          ? ""
          : String(product.originalPrice),
      image: product.image || "",
      stock: String(product.stock ?? 0),
    });

    setMessage("");
    setFormError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete product
  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(productId);
      setMessage("Product deleted successfully!");

      if (editingId === productId) {
        resetForm();
      }
    } catch (err) {
      console.error("Product delete error:", err);

      setFormError(
        err.response?.data?.detail ||
          "Unable to delete product."
      );
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">
        Manage Products
      </h1>

      {/* Product Form */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId !== null ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Selling Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              min="0.01"
              step="0.01"
              required
            />

            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              min="0"
              step="0.01"
            />
          </div>

          <input
            type="number"
            name="stock"
            placeholder="Available Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            min="0"
          />

          <input
            type="url"
            name="image"
            placeholder="Product Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {formError && (
            <p className="text-red-600 text-sm">
              {formError}
            </p>
          )}

          {message && (
            <p className="text-green-600 text-sm">
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">
          Existing Products ({products.length})
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">
            No products available.
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>

                    <p className="text-blue-600 font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
