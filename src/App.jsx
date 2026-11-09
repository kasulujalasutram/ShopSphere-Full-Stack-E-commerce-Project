
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context providers
import { ProductProvider } from "./ProductContext/ProductContext.jsx";
import { ReviewProvider } from "./ReviewContext/ReviewContext.jsx";
import { OrderProvider } from "./CartContext/OrderContext.jsx";
import { WishlistProvider } from "./CartContext/WishlistContext.jsx";
import { CartProvider } from "./CartContext/CartContext.jsx";

// Components
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin layout
import AdminLayout from "./admin/AdminLayout.jsx";

// Customer pages
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Profile from "./pages/Profile.jsx";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ManageProducts from "./admin/ManageProducts.jsx";
import ManageOrders from "./admin/ManageOrders.jsx";
import ManageCustomers from "./admin/ManageCustomers.jsx";

function App() {
  return (
    <ProductProvider>
      <ReviewProvider>
        <OrderProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <Navbar />

                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* Customer protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/my-orders/:id" element={<OrderDetails />} />
                  </Route>

                  {/* Admin protected routes */}
                  <Route element={<ProtectedRoute adminOnly />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<ManageProducts />} />
                      <Route path="orders" element={<ManageOrders />} />
                      <Route path="customers" element={<ManageCustomers />} />
                    </Route>
                  </Route>
                </Routes>

                <Footer />
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </OrderProvider>
      </ReviewProvider>
    </ProductProvider>
  );
}

export default App;
