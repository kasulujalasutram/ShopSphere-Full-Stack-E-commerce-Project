
import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Section Heading */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Discover our popular products and best deals.
          </p>
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;
