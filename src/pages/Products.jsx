
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../ProductContext/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

function Products() {
  const { products } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    () => searchParams.get("category") || "All"
  );

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("default");

  // Update category when URL changes
  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  // Handle category selection
  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("0");
    setSort("default");
    setCategory("All");
    setSearchParams({});
  };

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    const matchesRating =
      Number(product.rating || 0) >= Number(minRating);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating
    );
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "low-to-high":
        return a.price - b.price;

      case "high-to-low":
        return b.price - a.price;

      case "popularity":
        return (b.reviews || 0) - (a.reviews || 0);

      case "rating":
        return (b.rating || 0) - (a.rating || 0);

      default:
        return 0;
    }
  });

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Accessories",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Our Products
          </h1>

          <p className="text-gray-500 mt-2">
            Discover products at great prices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Search */}
            <div>
              <label className="block font-medium mb-2">
                Search Products
              </label>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  handleCategoryChange(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block font-medium mb-2">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="default">Default</option>
                <option value="low-to-high">
                  Price: Low to High
                </option>
                <option value="high-to-low">
                  Price: High to Low
                </option>
                <option value="popularity">
                  Popularity
                </option>
                <option value="rating">
                  Highest Rating
                </option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block font-medium mb-2">
                Minimum Rating
              </label>

              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="0">All Ratings</option>
                <option value="3">3 Stars & Above</option>
                <option value="4">4 Stars & Above</option>
                <option value="4.5">4.5 Stars & Above</option>
              </select>
            </div>
          </div>

          {/* Price Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

            <div>
              <label className="block font-medium mb-2">
                Minimum Price (₹)
              </label>

              <input
                type="number"
                min="0"
                placeholder="Minimum price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Maximum Price (₹)
              </label>

              <input
                type="number"
                min="0"
                placeholder="Maximum price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-5">
            <button
              onClick={clearFilters}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Product Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {category === "All" ? "All Products" : category}
          </h2>

          <p className="text-gray-500">
            {filteredProducts.length} Products Found
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold mb-2">
              No Products Found
            </h2>

            <p className="text-gray-500 mb-5">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Products;
