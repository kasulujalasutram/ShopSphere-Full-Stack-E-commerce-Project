
import { Link } from "react-router-dom";
import { useOrders } from "../CartContext/OrderContext.jsx";
import { useProducts } from "../ProductContext/ProductContext.jsx";

function AdminDashboard() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + Number(order.total || 0), 0);

  const totalCustomers = new Set(
    orders
      .map((order) => order.customer?.email?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      link: "/admin/orders",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      link: "/admin/customers",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      link: "/admin/orders",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome to the ShopSphere administration panel.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              to={stat.link}
              key={stat.title}
              className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition"
            >
              <p className="text-gray-500 mb-2">
                {stat.title}
              </p>

              <h2 className="text-2xl font-bold">
                {stat.value}
              </h2>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold mb-5">
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500 py-6">
              No orders available yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">
                        {order.customer?.name || "Unknown"}
                      </td>
                      <td className="p-3">
                        ₹{Number(order.total || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="p-3">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
