
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";

import { useProducts } from "../ProductContext/ProductContext.jsx";
import { useCart } from "../CartContext/CartContext.jsx";
import { useReviews } from "../ReviewContext/ReviewContext.jsx";
import ReviewForm from "../components/ReviewForm.jsx";

function ProductDetails() {
  const { products } = useProducts();
  const { id } = useParams();
  const { addToCart } = useCart();

  const { getProductReviews, getAverageRating } = useReviews();

  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Product Not Found
        </h2>

        <Link to="/products" className="text-blue-600 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const productReviews = getProductReviews(product.id);
  const averageRating = getAverageRating(product.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <Link
        to="/products"
        className="flex items-center gap-2 text-blue-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      {/* Product Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-4">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-5">
            <Star
              size={20}
              className="text-yellow-500 fill-yellow-500"
            />

            <span className="font-semibold">
              {productReviews.length > 0
                ? averageRating
                : product.rating}
            </span>

            <span className="text-gray-500">
              ({productReviews.length} customer reviews)
            </span>
          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold text-blue-600">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="text-gray-400 line-through ml-3">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews
        </h2>

        {productReviews.length === 0 ? (
          <p className="text-gray-500">
            No customer reviews yet. Be the first to review this product!
          </p>
        ) : (
          <div className="space-y-4">
            {productReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border rounded-xl p-5"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="text-gray-700 mt-3">
                  {review.comment}
                </p>

                <p className="text-gray-400 text-sm mt-3">
                  {review.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Form */}
      <ReviewForm productId={product.id} />

    </div>
  );
}

export default ProductDetails;
