
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../CartContext/OrderContext.jsx";

function OrderDetails() {
  const { id } = useParams();
  const { orders } = useOrders();

  const order = orders.find(
    (item) => String(item.id) === id
  );

  const trackingSteps = [
    "Order Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const statusToStep = {
    "Confirmed (Demo)": 0,
    Processing: 1,
    Shipped: 2,
    Delivered: 3,
  };

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Order Not Found
        </h1>
        <Link to="/my-orders" className="text-blue-600">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const isCancelled = order.status === "Cancelled";
  const currentStep = statusToStep[order.status] ?? -1;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <Link
          to="/my-orders"
          className="text-blue-600 hover:underline"
        >
          ← Back to My Orders
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h1 className="text-2xl font-bold mb-2">
            Order Details
          </h1>

          <p className="text-gray-500 mb-4">
            Order ID: {order.id}
          </p>

          <p className="mb-6">
            Current Status:{" "}
            <span className="font-semibold">
              {order.status}
            </span>
          </p>

          {isCancelled ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              This order has been cancelled.
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-6">
                Order Tracking
              </h2>

              <div className="space-y-5 mb-8">
                {trackingSteps.map((step, index) => {
                  const completed = index <= currentStep;

                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                          completed ? "bg-green-600" : "bg-gray-300"
                        }`}
                      >
                        {completed ? "✓" : index + 1}
                      </div>

                      <span
                        className={
                          completed
                            ? "font-semibold text-green-700"
                            : "text-gray-500"
                        }
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <h2 className="text-xl font-bold mb-4">
            Ordered Items
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right mt-6">
            <p className="text-xl font-bold">
              Total: ₹{order.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
