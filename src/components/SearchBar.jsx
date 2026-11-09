
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-50 focus-within:border-blue-500"
    >

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-5 py-3 outline-none bg-transparent text-gray-700"
      />

      <button
        type="submit"
        aria-label="Search products"
        className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-700"
      >
        <Search size={20} />
      </button>

    </form>
  );
}

export default SearchBar;
