import React from "react";
import {
  Search,
  Filter,
  Bell,
  GitCompare,
  Smartphone,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const Header = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  compareList,
  onShowCompare,
  viewMode,
  onToggleViewMode,
  priceAlerts,
  isOnline = true,
}) => {
  return (
    <>
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white text-center py-2 px-4 text-sm">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          You're offline. Some features may not work properly.
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">TechStore</h1>
              {priceAlerts.size > 0 && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  <Bell className="w-4 h-4" />
                  {priceAlerts.size} Price Alert
                  {priceAlerts.size !== 1 ? "s" : ""}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Desktop Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={onToggleFilters}
                  className="lg:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50 relative"
                  title="Toggle filters"
                >
                  <Filter className="w-5 h-5" />
                </button>

                {/* Compare Button */}
                {compareList.length > 0 && (
                  <button
                    onClick={onShowCompare}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 relative"
                    title="View compare list"
                  >
                    <GitCompare className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {compareList.length}
                    </span>
                  </button>
                )}

                {/* View Mode Toggle */}
                <button
                  onClick={onToggleViewMode}
                  className="hidden sm:block p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title={`Switch to ${
                    viewMode === "grid" ? "list" : "grid"
                  } view`}
                >
                  {viewMode === "grid" ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <RefreshCw className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
