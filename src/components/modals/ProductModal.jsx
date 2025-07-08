import React from "react";
import {
  X,
  ShoppingCart,
  Heart,
  ArrowRightLeft,
  Bell,
  Clock,
  CheckCircle,
  Camera,
  TrendingUp,
} from "lucide-react";
import StarRating from "../common/StarRating";
import { useWishlist } from "../../hooks/useWishlist";
import { useCompare } from "../../hooks/useCompare";

const PriceHistoryChart = ({ product }) => (
  <div className="bg-white rounded-lg p-4 border">
    <h4 className="font-semibold mb-3 flex items-center gap-2">
      <TrendingUp className="w-4 h-4" />
      Price History
    </h4>
    <div className="space-y-2">
      {product.priceHistory.map((entry, index) => (
        <div key={index} className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{entry.date}</span>
          <span
            className={`font-medium ${
              entry.price === product.price ? "text-green-600" : "text-gray-800"
            }`}
          >
            ${entry.price}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-3 pt-3 border-t">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Savings:</span>
        <span className="font-bold text-green-600">
          ${(product.priceHistory[0].price - product.price).toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

const ProductModal = ({
  product,
  onClose,
  onSetARPreview,
  priceAlerts,
  onTogglePriceAlert,
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { compareList, toggleCompare } = useCompare();

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <PriceHistoryChart product={product} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h3>
                {product.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    NEW
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                    TRENDING
                  </span>
                )}
              </div>

              <StarRating rating={product.rating} reviews={product.reviews} />

              <div className="flex items-center gap-2 mt-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    {product.stock} in stock
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    {product.estimatedDelivery}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-lg transition-colors ${
                    wishlist.has(product.id)
                      ? "bg-red-500 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-3 rounded-lg transition-colors ${
                    compareList.find((p) => p.id === product.id)
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              {product.hasARPreview && (
                <button
                  onClick={() => onSetARPreview(product)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium mb-4 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  View in AR
                </button>
              )}

              <button
                onClick={() => onTogglePriceAlert(product.id)}
                className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  priceAlerts.has(product.id)
                    ? "bg-blue-100 text-blue-600"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Bell className="w-4 h-4" />
                {priceAlerts.has(product.id)
                  ? "Price Alert Active"
                  : "Set Price Alert"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
