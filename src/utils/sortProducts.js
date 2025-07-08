// utils/sortProducts.js
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "price-low":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price-high":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "rating":
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case "reviews":
      return sortedProducts.sort((a, b) => b.reviews - a.reviews);
    case "newest":
      return sortedProducts.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
    case "trending":
      return sortedProducts.sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return 0;
      });
    default:
      return sortedProducts;
  }
};

export const getSortLabel = (sortBy) => {
  const labels = {
    relevance: "Relevance",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    rating: "Customer Rating",
    reviews: "Most Reviewed",
    newest: "Newest First",
    trending: "Trending",
  };
  return labels[sortBy] || "Relevance";
};
