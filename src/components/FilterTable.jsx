import { Search } from "lucide-react";

const FilterTable = ({ onFilter, placeholder = "Filter by name..." }) => {
  const handleChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-64"
        />
      </div>
    </div>
  );
};

export default FilterTable;
