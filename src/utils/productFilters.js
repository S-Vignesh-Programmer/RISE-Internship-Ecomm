// utils/productFilters.js
export const filterProducts = (products, filters) => {
  const { searchTerm, selectedCategory, priceRange, minRating } = filters;

  return products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesPrice = (() => {
      if (priceRange === "all") return true;
      if (priceRange === "0-1000") return product.price < 1000;
      if (priceRange === "1000-5000")
        return product.price >= 5000 && product.price < 10000;
      if (priceRange === "10000-20000")
        return product.price >= 10000 && product.price < 20000;
      if (priceRange === "20000+") return product.price >= 20000;
      return true;
    })();

    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
};

export const getRecommendedProducts = (products, recentlyViewed) => {
  if (recentlyViewed.length === 0) return [];

  const recentCategories = [
    ...new Set(
      recentlyViewed.map((id) => products.find((p) => p.id === id)?.category)
    ),
  ];

  return products
    .filter(
      (p) =>
        recentCategories.includes(p.category) && !recentlyViewed.includes(p.id)
    )
    .slice(0, 3);
};

export const getPriceRangeLabel = (priceRange) => {
  const ranges = {
    all: "All Prices",
    "0-1000": "Under ₹1000",
    "1000-5000": "₹5000 - ₹10000",
    "10000-20000": "₹10000 - ₹20000",
    "20000+": "₹20000+",
  };
  return ranges[priceRange] || "All Prices";
};
