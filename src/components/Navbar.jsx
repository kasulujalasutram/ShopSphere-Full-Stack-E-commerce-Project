
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Store,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useCart } from "../CartContext/CartContext.jsx";
import { useWishlist } from "../CartContext/WishlistContext.jsx";
import { useAuth } from "../AuthContext/AuthContext.jsx";

function Navbar() {
  const { cartCount = 0 } = useCart();
  const { wishlist = [] } = useWishlist() || {};

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  const linkClass = ({ isActive }) =>
    `block py-2 transition ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Store size={28} className="text-blue-600" />
          <span className="text-xl font-bold text-blue-600">
            ShopSphere
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}

          {isAuthenticated && isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              <span className="flex items-center gap-1">
                <LayoutDashboard size={18} />
                Admin
              </span>
            </NavLink>
          )}

          <NavLink to="/wishlist" className={linkClass}>
            <span className="flex items-center gap-1">
              <Heart size={19} />
              Wishlist ({wishlist.length})
            </span>
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            <span className="flex items-center gap-1">
              <ShoppingCart size={19} />
              Cart ({cartCount})
            </span>
          </NavLink>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">
                <User size={17} className="inline mr-1" />
                {user?.first_name || user?.username}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((previous) => !previous)}
          className="md:hidden p-2 text-gray-700"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden border-t px-5 py-4 bg-white">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkClass}
                onClick={closeMenu}
              >
                {item.name}
              </NavLink>
            ))}

            {isAuthenticated && isAdmin && (
              <NavLink
                to="/admin"
                className={linkClass}
                onClick={closeMenu}
              >
                Admin Dashboard
              </NavLink>
            )}

            <NavLink
              to="/wishlist"
              className={linkClass}
              onClick={closeMenu}
            >
              Wishlist ({wishlist.length})
            </NavLink>

            <NavLink
              to="/cart"
              className={linkClass}
              onClick={closeMenu}
            >
              Cart ({cartCount})
            </NavLink>

            {isAuthenticated ? (
              <>
                <div className="py-2 text-gray-700 text-sm">
                  <User size={17} className="inline mr-2" />
                  {user?.first_name || user?.username}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
