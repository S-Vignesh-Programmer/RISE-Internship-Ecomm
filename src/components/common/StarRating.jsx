import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, reviews, showReviews = true, size = "sm" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      {showReviews && reviews && (
        <span className={`${textSizeClasses[size]} text-gray-600 ml-1`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default StarRating;
