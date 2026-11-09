import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useWishlist } from "../CartContext/WishlistContext.jsx";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Heart size={65} className="text-gray-300 mb-4" />

        <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>

        <p className="text-gray-500 mt-2">
          Save your favourite products here.
        </p>

        <Link
          to="/products"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain bg-gray-100 rounded-lg"
            />

            <h3 className="font-semibold mt-4">{product.name}</h3>

            <p className="text-blue-600 font-bold mt-2">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <button
              onClick={() => removeFromWishlist(product.id)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg"
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;