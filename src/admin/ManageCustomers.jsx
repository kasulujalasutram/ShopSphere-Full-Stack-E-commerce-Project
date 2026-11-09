
import { useState } from "react";
import { useOrders } from "../CartContext/OrderContext.jsx";

function ManageCustomers() {
  const { orders } = useOrders();
  const [search, setSearch] = useState("");

  const customers = Object.values(
    orders.reduce((result, order) => {
      const email = order.customer?.email?.trim().toLowerCase();

      if (!email) return result;

      if (!result[email]) {
        result[email] = {
          email,
          name: order.customer?.name || "Unknown",
          phone: order.customer?.phone || "Not provided",
          totalOrders: 0,
          totalSpent: 0,
        };
      }

      result[email].totalOrders += 1;
      result[email].totalSpent += Number(order.total) || 0;

      return result;
    }, {})
  );

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.includes(searchText) ||
      customer.phone.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">
        Manage Customers
      </h1>

      <p className="text-gray-500 mb-8">
        Search and view customer information.
      </p>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">
            All Customers ({filteredCustomers.length})
          </h2>

          <input
            type="text"
            placeholder="Search name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-80 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredCustomers.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            {customers.length === 0
              ? "No customer records available yet."
              : "No matching customers found."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Orders</th>
                  <th className="p-3">Total Spent</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.email} className="border-b">
                    <td className="p-3 font-semibold">
                      {customer.name}
                    </td>
                    <td className="p-3">{customer.email}</td>
                    <td className="p-3">{customer.phone}</td>
                    <td className="p-3">{customer.totalOrders}</td>
                    <td className="p-3 font-semibold">
                      ₹{customer.totalSpent.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageCustomers;
