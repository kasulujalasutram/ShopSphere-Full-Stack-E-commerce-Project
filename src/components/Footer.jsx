
import { Link } from "react-router-dom";
import { Store, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Store size={28} className="text-blue-400" />
            <span className="text-2xl font-bold text-white">
              ShopSphere
            </span>
          </Link>

          <p className="text-sm leading-6">
            Your one-stop online shopping destination.
            Discover quality products at great prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400">Products</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-blue-400">Wishlist</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            My Account
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
            <li><Link to="/my-orders" className="hover:text-blue-400">My Orders</Link></li>
            <li><Link to="/checkout" className="hover:text-blue-400">Checkout</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={17} className="text-blue-400" />
              support@shopsphere.com
            </li>

            <li className="flex items-center gap-2">
              <Phone size={17} className="text-blue-400" />
              +91 98765 43210
            </li>

            <li className="flex items-center gap-2">
              <MapPin size={17} className="text-blue-400" />
              India
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-5 px-4 text-sm">
        © {new Date().getFullYear()} ShopSphere. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
