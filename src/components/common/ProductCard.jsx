import React from "react";
import {
  Heart,
  Eye,
  ShoppingCart,
  Camera,
  TrendingUp,
  AlertCircle,
  Clock,
  Bell,
  GitCompare,
} from "lucide-react";
import StarRating from "./StarRating";

const ProductCard = ({
  product,
  wishlist,
  compareList,
  priceAlerts,
  onToggleWishlist,
  onToggleCompare,
  onTogglePriceAlert,
  onOpenDetails,
  onShowARPreview,
  onAddToCart,
}) => {
  const isInWishlist = wishlist.has(product.id);
  const isInCompare = compareList.find((p) => p.id === product.id);
  const hasPriceAlert = priceAlerts.has(product.id);
  const isLowStock = product.stock <= product.lowStockThreshold;
  const hasDiscount = product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              HOT
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* <button
            onClick={() => onOpenDetails(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            title="View details"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button> */}

          {/* <button
            onClick={() => onToggleCompare(product)}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInCompare
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title={isInCompare ? "Remove from compare" : "Add to compare"}
          >
            <GitCompare className="w-4 h-4" />
          </button> */}

          {/* {product.hasARPreview && (
            <button
              onClick={() => onShowARPreview(product)}
              className="p-2 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600"
              title="View in AR"
            >
              <Camera className="w-4 h-4" />
            </button>
          )} */}
        </div>

        {/* Stock Status */}
        {isLowStock && (
          <div className="absolute bottom-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Only {product.stock} left
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="flex items-center gap-2 mt-3 mb-2">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          {hasDiscount && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Price Alert & Delivery Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{product.estimatedDelivery}</span>
          </div>
          <button
            onClick={() => onTogglePriceAlert(product.id)}
            className={`flex items-center gap-1 transition-colors ${
              hasPriceAlert
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title={hasPriceAlert ? "Remove price alert" : "Set price alert"}
          >
            <Bell className="w-3 h-3" />
            Price Alert
          </button>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
