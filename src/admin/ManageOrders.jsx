
import { useState } from "react";
import { useOrders } from "../CartContext/OrderContext.jsx";

function ManageOrders() {
  const { orders, updateOrderStatus } = useOrders();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = [
    "Confirmed (Demo)",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(order.id).toLowerCase().includes(searchText) ||
      (order.customer?.name || "").toLowerCase().includes(searchText) ||
      (order.customer?.email || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">
        Manage Orders
      </h1>

      <p className="text-gray-500 mb-8">
        Search orders and manage their delivery status.
      </p>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">
            All Orders ({filteredOrders.length})
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="All">All Statuses</option>

              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "Confirmed (Demo)" ? "Confirmed" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            {orders.length === 0
              ? "No orders available yet."
              : "No matching orders found."}
          </p>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl p-5"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-lg">
                      Order #{order.id}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {order.date}
                    </p>
                  </div>

                  <p className="font-bold text-lg">
                    ₹{Number(order.total || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Customer
                    </p>
                    <p className="font-semibold">
                      {order.customer?.name || "Unknown"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {order.customer?.email || "No email"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm mb-2">
                      Update Order Status
                    </p>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="border rounded-lg p-3 w-full"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status === "Confirmed (Demo)" ? "Confirmed" : status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-semibold mb-2">
                    Ordered Products
                  </p>

                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm py-1"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageOrders;
