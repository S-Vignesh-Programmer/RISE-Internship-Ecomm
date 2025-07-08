import React from "react";
import { X, ArrowRightLeft, CheckCircle } from "lucide-react";
import StarRating from "../common/StarRating";
import { useCompare } from "../../hooks/useCompare";

const CompareModal = ({ onClose, onOpenProductDetails }) => {
  const { compareList, toggleCompare } = useCompare();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Compare Products ({compareList.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {compareList.length === 0 ? (
            <div className="text-center py-8">
              <ArrowRightLeft className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products to compare</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-semibold">Product</th>
                    {compareList.map((product) => (
                      <th
                        key={product.id}
                        className="text-center p-4 min-w-[200px]"
                      >
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                          />
                          <button
                            onClick={() => toggleCompare(product)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                          <h3 className="font-medium text-sm">
                            {product.name}
                          </h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Price</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="text-xl font-bold text-blue-600">
                          ₹{product.price}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Rating</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <StarRating
                            rating={product.rating}
                            reviews={product.reviews}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Stock</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.stock > product.lowStockThreshold
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {product.stock} available
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Delivery</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm">
                        {product.estimatedDelivery}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Features</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4">
                        <ul className="text-sm space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Savings</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.originalPrice > product.price && (
                          <div className="text-sm">
                            <div className="text-green-600 font-medium">
                               ₹
                              {(product.originalPrice - product.price).toFixed(
                                2
                              )}
                            </div>
                            <div className="text-gray-500">
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              % off
                            </div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Actions</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4">
                        <div className="space-y-2">
                          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Add to Cart
                          </button>
                          <button
                            onClick={() => onOpenProductDetails(product)}
                            className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
