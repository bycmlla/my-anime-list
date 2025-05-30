import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ImageSlider.css";
import StartImage from "../../assets/images/start.png";
import StartImage2 from "../../assets/images/start1.jpg";
import StartImage4 from "../../assets/images/start3.jpeg";
import StartImage6 from "../../assets/images/start5.png";
import StartImage7 from "../../assets/images/start6.jpg";
import StartImage8 from "../../assets/images/start7.png";
import StartImage9 from "../../assets/images/start8.png";
import StartImage10 from "../../assets/images/start9.jpeg";
import StartImage11 from "../../assets/images/start10.jpg";
import StartImage12 from "../../assets/images/start11.png";
import StartImage13 from "../../assets/images/start12.jpg";
import StartImage14 from "../../assets/images/start13.jpg";
import StartImage16 from "../../assets/images/start15.png";
import StartImage17 from "../../assets/images/start16.jpg";
import StartImage18 from "../../assets/images/start17.png";
import StartImage19 from "../../assets/images/start18.png";
import StartImage21 from "../../assets/images/start20.png";
import { FaInfoCircle } from "react-icons/fa";
import { useRef } from "react";

const images = [
  StartImage,
  StartImage2,
  StartImage4,
  StartImage6,
  StartImage7,
  StartImage8,
  StartImage9,
  StartImage10,
  StartImage11,
  StartImage12,
  StartImage13,
  StartImage14,
  StartImage16,
  StartImage17,
  StartImage18,
  StartImage19,
  StartImage21,
];

const TRANSITION_DURATION = 1000;
const DISPLAY_DURATION = 2000;

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % images.length;

      setBottomIndex(nextIndex);
      setIsTransitioning(true);

      timeoutRef.current = setTimeout(() => {
        setActiveIndex(nextIndex);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }, DISPLAY_DURATION);

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex]);

  return (
    <div className="start-image">
      <img
        src={images[bottomIndex]}
        alt="Imagem seguinte"
        className="bg-image bg-bottom"
      />

      <img
        src={images[activeIndex]}
        alt="Imagem atual"
        className={`bg-image bg-top ${isTransitioning ? "fade-out" : ""}`}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
      />

      <Link to="/info">
        <FaInfoCircle className="info-icon" />
      </Link>
    </div>
  );
};

export default ImageSlider;
