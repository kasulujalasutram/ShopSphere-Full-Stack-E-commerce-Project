
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../CartContext/CartContext.jsx";
import { useWishlist } from "../CartContext/WishlistContext.jsx";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    addToCart(product);
    console.log("Added to cart:", product.name);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    console.log("Wishlist clicked:", product.name);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition">

      {/* Product Image */}
      <div className="relative bg-gray-100 p-5">

        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            className={
              isWishlisted
                ? "text-red-500 fill-red-500"
                : "text-gray-500"
            }
          />
        </button>

        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded">
            {product.discount}% OFF
          </span>
        )}

      </div>

      {/* Product Details */}
      <div className="p-4">

        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <Star
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />

          <span className="text-sm">{product.rating}</span>

          <span className="text-gray-400 text-xs">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">

          <span className="text-xl font-bold text-blue-600">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}

        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
