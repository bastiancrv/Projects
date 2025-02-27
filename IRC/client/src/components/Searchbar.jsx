import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Icône de recherche

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center bg-[#2c2f3f] border border-[#44475a] rounded-xl px-4 py-2 transition-all focus-within:border-[#6272a4] w-full">
      <FiSearch className="text-gray-400 text-lg" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search chats..."
        className="bg-transparent outline-none border-none text-white text-sm px-3 w-full placeholder-slate-400"
      />
    </div>
  );
}

export default Searchbar;
