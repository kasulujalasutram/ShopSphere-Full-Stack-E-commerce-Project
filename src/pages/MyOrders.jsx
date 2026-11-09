
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useOrders } from "../CartContext/OrderContext.jsx";

function MyOrders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Package size={65} className="text-gray-300 mb-4" />

        <h2 className="text-2xl font-bold">No Orders Yet</h2>

        <p className="text-gray-500 mt-2">
          Your orders will appear here after checkout.
        </p>

        <Link
          to="/products"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <h2 className="font-bold text-lg">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {order.date}
                </p>
              </div>

              <span className="text-green-600 font-semibold">
                {order.status}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹{(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold">
              <span>Order Total</span>

              <span className="text-blue-600">
                ₹{order.total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* View Order Details */}
            <Link
              to={`/my-orders/${order.id}`}
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
