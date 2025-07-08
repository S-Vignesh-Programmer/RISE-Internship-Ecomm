// components/sections/ProductGrid.jsx
import React from "react";
import { RefreshCw, Smartphone } from "lucide-react";
import ProductCard from "../common/ProductCard";
import { SORT_OPTIONS } from "../../utils/constants";

const ProductGrid = ({
  filteredProducts,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onProductClick,
  wishlist,
  onToggleWishlist,
  compareList,
  onToggleCompare,
  onSetPriceAlert,
  priceAlerts,
  onShowARPreview,
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {filteredProducts.length} Product
          {filteredProducts.length !== 1 ? "s" : ""} Found
        </h2>

        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="hidden sm:block p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
          >
            {viewMode === "grid" ? (
              <Smartphone className="w-5 h-5" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              compareList={compareList}
              priceAlerts={priceAlerts}
              onToggleWishlist={onToggleWishlist}
              onToggleCompare={onToggleCompare}
              onTogglePriceAlert={onSetPriceAlert} 
              onOpenDetails={onProductClick}
              onShowARPreview={onShowARPreview}
              onAddToCart={() => {}} // Optional placeholder
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
