
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

        <div className="max-w-2xl">

          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            Discover the ShopSphere Experience
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Everything
            <br />
            You Love in One Place.
          </h1>

          <p className="text-blue-100 text-lg mb-8">
            Explore quality products, amazing deals and a smarter
            shopping experience with ShopSphere.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/products"
              className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              <ShoppingBag size={20} />
              Shop Now
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-2 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              Explore Products
              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroBanner;
