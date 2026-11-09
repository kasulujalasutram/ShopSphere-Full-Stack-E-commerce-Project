import HeroBanner from "../components/HeroBanner.jsx";
import ProductCategories from "../components/ProductCategories.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
function Home() {
  return (
    <>
      <HeroBanner />
      <ProductCategories />
      <FeaturedProducts />
    </>
  );
}

export default Home;