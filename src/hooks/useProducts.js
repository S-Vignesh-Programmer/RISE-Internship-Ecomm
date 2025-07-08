// hooks/useProducts.js
import { useState, useMemo } from "react";
import { products } from "../data/products";
import {
  filterProducts,
  getRecommendedProducts,
} from "../utils/productFilters";
import { sortProducts } from "../utils/sortProducts";

export const useProducts = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => {
      const newViewed = [
        productId,
        ...prev.filter((id) => id !== productId),
      ].slice(0, 5);
      return newViewed;
    });
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product.id);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const getFilteredAndSortedProducts = (filters, sortBy) => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  };

  const recommendedProducts = useMemo(() => {
    return getRecommendedProducts(products, recentlyViewed);
  }, [recentlyViewed]);

  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  return {
    products,
    selectedProduct,
    recentlyViewed,
    recommendedProducts,
    openProductDetails,
    closeProductDetails,
    getFilteredAndSortedProducts,
    getProductById,
    addToRecentlyViewed,
  };
};
