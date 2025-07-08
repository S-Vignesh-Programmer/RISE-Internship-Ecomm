// hooks/useWishlist.js
import { useState } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(new Set());
  const [priceAlerts, setPriceAlerts] = useState(new Set());

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const togglePriceAlert = (productId) => {
    setPriceAlerts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.has(productId);
  };

  const hasPriceAlert = (productId) => {
    return priceAlerts.has(productId);
  };

  const getWishlistCount = () => {
    return wishlist.size;
  };

  const getPriceAlertCount = () => {
    return priceAlerts.size;
  };

  const clearWishlist = () => {
    setWishlist(new Set());
  };

  const clearPriceAlerts = () => {
    setPriceAlerts(new Set());
  };

  return {
    wishlist,
    priceAlerts,
    toggleWishlist,
    togglePriceAlert,
    isInWishlist,
    hasPriceAlert,
    getWishlistCount,
    getPriceAlertCount,
    clearWishlist,
    clearPriceAlerts,
  };
};
