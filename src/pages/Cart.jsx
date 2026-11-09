import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../CartContext/CartContext.jsx";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingCart size={70} className="text-gray-300 mb-4" />

        <h2 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mt-2">
          Add some products to your cart.
        </p>

        <Link
          to="/"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 bg-white p-5 rounded-xl shadow-sm border"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-2">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="border p-1 rounded"
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="border p-1 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border h-fit">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">
              ₹{cartTotal.toLocaleString("en-IN")}
            </span>
          </div>

            <Link
            to="/checkout"
            className="block text-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
            Proceed to Checkout
</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;