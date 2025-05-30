import React from "react";
import { FaStar } from "react-icons/fa";
import "./RatingContent.css";

const RatingContent = ({ ratingText }) => {
  const numericRating = parseFloat(ratingText.split("/")[0]) || 0;
  const starCount = Math.round(numericRating / 2); 

  return (
    <div className="rating-stars-wrapper">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          size={20}
          className="star"
          color={i < starCount ? "#ffc107" : "#e4e5e9"}
        />
      ))}
    </div>
  );
};

export default RatingContent;
