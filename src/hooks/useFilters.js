import { useState } from "react";

export const useFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setMinRating(0);
    setSortBy("relevance");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filters = {
    searchTerm,
    selectedCategory,
    priceRange,
    minRating,
    sortBy,
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "all" ||
    priceRange !== "all" ||
    minRating > 0;

  const updateFilter = (key, value) => {
    switch (key) {
      case "searchTerm":
        setSearchTerm(value);
        break;
      case "selectedCategory":
        setSelectedCategory(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
      case "minRating":
        setMinRating(value);
        break;
      case "sortBy":
        setSortBy(value);
        break;
      default:
        console.warn(`Unknown filter key: ${key}`);
    }
  };

  return {
    // Filter values
    searchTerm,
    selectedCategory,
    priceRange,
    minRating,
    sortBy,
    showFilters,
    filters,
    hasActiveFilters,

    // Setters
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    setMinRating,
    setSortBy,
    setShowFilters,

    // Actions
    clearFilters,
    toggleFilters,
    updateFilter, // 
  };
};
