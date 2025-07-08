import React, { useMemo } from "react";
import { Zap, Eye } from "lucide-react";
import { products } from "../../data/products";

const RecommendationBanner = ({ recentlyViewed, onProductClick }) => {
  const recommendedProducts = useMemo(() => {
    if (recentlyViewed.length === 0) return [];

    const recentCategories = [
      ...new Set(
        recentlyViewed.map((id) => products.find((p) => p.id === id)?.category)
      ),
    ];

    return products
      .filter(
        (p) =>
          recentCategories.includes(p.category) &&
          !recentlyViewed.includes(p.id)
      )
      .slice(0, 3);
  }, [recentlyViewed]);

  if (recommendedProducts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Recommended for you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 bg-white bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition-all duration-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm opacity-80">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs opacity-60 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onProductClick(product)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                title="View product details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationBanner;
