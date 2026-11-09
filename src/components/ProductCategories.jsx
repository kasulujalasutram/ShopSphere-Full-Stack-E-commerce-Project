
import {
  Monitor,
  Shirt,
  House,
  Sparkles,
  Dumbbell,
  BookOpen,
} from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: Monitor },
  { name: "Fashion", icon: Shirt },
  { name: "Home & Kitchen", icon: House },
  { name: "Beauty", icon: Sparkles },
  { name: "Sports", icon: Dumbbell },
  { name: "Books", icon: BookOpen },
];

function ProductCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition"
            >
              <Icon
                size={35}
                className="mx-auto mb-4 text-blue-600"
              />

              <h3 className="font-semibold">
                {category.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ProductCategories;
