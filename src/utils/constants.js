// utils/constants.js
export const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
];

export const PRICE_RANGES = [
  { value: "all", label: "All Prices" },
  { value: "0-1000", label: "Under ₹1000" },
  { value: "5000-10000", label: "₹5000 - ₹10000" },
  { value: "100-20000", label: "₹10000 - ₹20000" },
  { value: "20000", label: "₹20000+" },
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "newest", label: "Newest First" },
];

export const RATING_OPTIONS = [
  { value: 4, label: "4+ Stars" },
  { value: 3, label: "3+ Stars" },
  { value: 2, label: "2+ Stars" },
  { value: 1, label: "1+ Stars" },
  { value: 0, label: "All Ratings" },
];

export const VIEW_MODES = {
  GRID: "grid",
  LIST: "list",
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};
