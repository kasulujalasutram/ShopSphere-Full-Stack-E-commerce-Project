
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-sm border text-center">

        <CheckCircle
          size={75}
          className="text-green-500 mx-auto mb-5"
        />

        <h1 className="text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with ShopSphere.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 mt-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Package className="text-blue-600" size={24} />
            <h2 className="font-bold text-lg">Order Details</h2>
          </div>

          <p className="text-gray-600">
            Order ID: <strong>{order?.id || "Pending backend integration"}</strong>
          </p>

          {order && (
            <p className="text-gray-600 mt-2">
              Total: <strong>₹{order.total.toLocaleString("en-IN")}</strong>
            </p>
          )}

          <p className="text-gray-600 mt-2">
            Status: <span className="text-green-600 font-semibold">Confirmed (Demo)</span>
          </p>
        </div>

        <Link
          to="/products"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <ShoppingBag size={20} />
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}

export default OrderSuccess;
