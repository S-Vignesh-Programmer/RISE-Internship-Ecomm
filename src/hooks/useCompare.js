// hooks/useCompare.js
import { useState } from "react";

export const useCompare = () => {
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.filter((p) => p.id !== product.id);
      } else if (prev.length < 3) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => {
    return compareList.some((p) => p.id === productId);
  };

  const getCompareCount = () => {
    return compareList.length;
  };

  const canAddToCompare = () => {
    return compareList.length < 3;
  };

  const openCompareModal = () => {
    setShowCompare(true);
  };

  const closeCompareModal = () => {
    setShowCompare(false);
  };

  return {
    compareList,
    showCompare,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    getCompareCount,
    canAddToCompare,
    openCompareModal,
    closeCompareModal,
  };
};
