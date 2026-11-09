
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
} from "lucide-react";

function AdminLayout() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Manage Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Manage Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Manage Customers",
      path: "/admin/customers",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white p-5">
        <div className="flex items-center gap-3 mb-8">
          <Store size={28} />
          <h2 className="text-xl font-bold">ShopSphere Admin</h2>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 mt-8 rounded-lg text-gray-300 hover:bg-gray-800"
        >
          <Store size={20} />
          Back to Store
        </NavLink>
      </aside>

      <main className="flex-1 min-w-0 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
