import React from "react";
import { Filter, Star } from "lucide-react";
import { CATEGORIES, PRICE_RANGES } from "../../utils/constants";

const FilterSidebar = ({
  showFilters,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  searchTerm,
  setSearchTerm,
  onClearFilters,
}) => {
  return (
    <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {PRICE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={minRating === rating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="mr-2"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating > 0 ? `${rating}+ Stars` : "All Ratings"}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
