import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const PriceHistoryChart = ({ product }) => {
  const calculateSavings = () => {
    if (!product.priceHistory || product.priceHistory.length === 0) return 0;
    return product.priceHistory[0].price - product.price;
  };

  const calculatePriceChange = () => {
    if (!product.priceHistory || product.priceHistory.length < 2) return 0;
    const previousPrice =
      product.priceHistory[product.priceHistory.length - 2].price;
    return product.price - previousPrice;
  };

  const getMaxPrice = () => {
    if (!product.priceHistory || product.priceHistory.length === 0)
      return product.price;
    return Math.max(
      ...product.priceHistory.map((entry) => entry.price),
      product.price
    );
  };

  const getMinPrice = () => {
    if (!product.priceHistory || product.priceHistory.length === 0)
      return product.price;
    return Math.min(
      ...product.priceHistory.map((entry) => entry.price),
      product.price
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const maxPrice = getMaxPrice();
  const minPrice = getMinPrice();
  const savings = calculateSavings();
  const priceChange = calculatePriceChange();

  return (
    <div className="bg-white rounded-lg p-4 border">
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Price History
      </h4>

      {/* Price Chart Visual */}
      <div className="relative mb-4">
        <div className="h-32 bg-gray-50 rounded-lg p-3 flex items-end justify-between">
          {product.priceHistory &&
            product.priceHistory.map((entry, index) => {
              const height =
                ((entry.price - minPrice) / (maxPrice - minPrice)) * 100;
              const isLowest = entry.price === minPrice;
              const isHighest = entry.price === maxPrice;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full flex justify-center">
                    <div
                      className={`w-4 rounded-t transition-all duration-300 ${
                        isLowest
                          ? "bg-green-500"
                          : isHighest
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    {(isLowest || isHighest) && (
                      <div className="absolute -top-6 text-xs font-medium text-gray-600">
                        ₹{entry.price}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(entry.date)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Price History List */}
      <div className="space-y-2 mb-4">
        {product.priceHistory &&
          product.priceHistory.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-600">{formatDate(entry.date)}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-medium ${
                    entry.price === product.price
                      ? "text-green-600"
                      : "text-gray-800"
                  }`}
                >
                  ₹{entry.price}
                </span>
                {entry.price === product.price && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 pt-3 border-t">
        {savings > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Savings:</span>
            <span className="font-bold text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />₹{savings.toFixed(2)}
            </span>
          </div>
        )}

        {priceChange !== 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Recent Change:</span>
            <span
              className={`font-medium flex items-center gap-1 ${
                priceChange > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {priceChange > 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {priceChange > 0 ? "+" : ""}₹{priceChange.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price Range:</span>
          <span className="text-sm font-medium text-gray-800">
            ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
