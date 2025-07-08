// App.jsx
import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

// Custom hooks
import { useProducts } from "./hooks/useProducts";
import { useWishlist } from "./hooks/useWishlist";
import { useCompare } from "./hooks/useCompare";
import { useFilters } from "./hooks/useFilters";

// Components
import Header from "./components/common/Header";
import FilterSidebar from "./components/sections/FilterSidebar";
import ProductGrid from "./components/sections/ProductGrid";
import RecommendationBanner from "./components/sections/RecommendationBanner";
import ProductModal from "./components/modals/ProductModal";
import CompareModal from "./components/modals/CompareModal";
import ARPreviewModal from "./components/modals/ARPreviewModal";

const App = () => {
  const [showCompare, setShowCompare] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [priceAlerts, setPriceAlerts] = useState(new Set());

  // Custom hooks
  const {
    selectedProduct,
    openProductDetails,
    closeProductDetails,
    recentlyViewed,
    recommendedProducts,
    getFilteredAndSortedProducts,
  } = useProducts();
  const { wishlist, toggleWishlist } = useWishlist();
  const { compareList, toggleCompare } = useCompare();
  const {
    filters,
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    setMinRating,
    setSortBy,
    showFilters,
    setShowFilters,
    clearFilters,
  } = useFilters();

  // Get the filtered + sorted products
  const filteredProducts = getFilteredAndSortedProducts(
    filters,
    filters.sortBy
  );

  // Handle online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Offline notice */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white text-center py-2 px-4 text-sm">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          You're offline. Some features may not work properly.
        </div>
      )}

      {/* Header */}
      <Header
        searchTerm={filters.searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        compareList={compareList}
        onShowCompare={() => setShowCompare(true)}
        priceAlerts={priceAlerts}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode(viewMode === "grid" ? "list" : "grid")
        }
      />

      {/* Recommendations */}
      <RecommendationBanner
        recentlyViewed={recentlyViewed}
        onProductClick={openProductDetails}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            showFilters={showFilters}
            selectedCategory={filters.selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={filters.priceRange}
            setPriceRange={setPriceRange}
            minRating={filters.minRating}
            setMinRating={setMinRating}
            searchTerm={filters.searchTerm}
            setSearchTerm={setSearchTerm}
            onClearFilters={clearFilters}
          />

          {/* Product Grid */}
          <ProductGrid
            filteredProducts={filteredProducts}
            sortBy={filters.sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onProductClick={openProductDetails}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            compareList={compareList}
            onToggleCompare={toggleCompare}
            onSetPriceAlert={togglePriceAlert}
            priceAlerts={priceAlerts}
            onShowARPreview={setShowARPreview}
          />
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductDetails}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          compareList={compareList}
          onToggleCompare={toggleCompare}
          priceAlerts={priceAlerts}
          onTogglePriceAlert={togglePriceAlert}
          onShowARPreview={setShowARPreview}
        />
      )}

      {showCompare && (
        <CompareModal
          compareList={compareList}
          onClose={() => setShowCompare(false)}
          onToggleCompare={toggleCompare}
          onProductClick={openProductDetails}
        />
      )}

      {showARPreview && (
        <ARPreviewModal
          product={showARPreview}
          onClose={() => setShowARPreview(false)}
        />
      )}
    </div>
  );
};

export default App;
