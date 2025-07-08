import React, { useState } from "react";
import {
  X,
  Camera,
  Smartphone,
  Monitor,
  Scan,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const ARPreviewModal = ({ product, onClose }) => {
  const [isARActive, setIsARActive] = useState(false);
  const [arMode, setArMode] = useState("surface"); // surface, wall, hand
  const [isLoading, setIsLoading] = useState(false);

  const handleStartAR = () => {
    setIsLoading(true);
    // Simulate AR initialization
    setTimeout(() => {
      setIsLoading(false);
      setIsARActive(true);
    }, 2000);
  };

  const handleStopAR = () => {
    setIsARActive(false);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">AR Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isARActive ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">AR Preview</h3>
              <p className="text-gray-600 mb-6">
                Experience <span className="font-medium">{product.name}</span>{" "}
                in augmented reality. Point your camera at a flat surface to see
                how it looks in your space.
              </p>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                  </div>
                </div>
              </div>

              {/* AR Mode Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Choose AR Mode:</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setArMode("surface")}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      arMode === "surface"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Monitor className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Surface</span>
                  </button>
                  <button
                    onClick={() => setArMode("wall")}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      arMode === "wall"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Scan className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Wall</span>
                  </button>
                  <button
                    onClick={() => setArMode("hand")}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      arMode === "hand"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Hand</span>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">
                  Instructions:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>• Make sure you're in a well-lit area</li>
                  <li>• Allow camera access when prompted</li>
                  <li>• Find a flat, empty surface</li>
                  <li>• Move your device slowly for best results</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStartAR}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Initializing AR...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      Start AR Preview
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* AR Camera View Simulation */}
              <div className="bg-gray-900 rounded-lg aspect-video mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                    />
                    <p className="text-white text-sm">AR View Active</p>
                  </div>
                </div>

                {/* AR Overlay Elements */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  AR Mode: {arMode}
                </div>

                <div className="absolute bottom-4 left-4 text-white text-sm">
                  Move your device to position the item
                </div>
              </div>

              {/* AR Controls */}
              <div className="flex justify-center gap-4 mb-6">
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ZoomOut className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info in AR */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStopAR}
                  className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Stop AR Preview
                </button>

                <button
                  onClick={onClose}
                  className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARPreviewModal;
