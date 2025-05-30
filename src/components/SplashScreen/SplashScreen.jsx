import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import SplashImage from "../../assets/images/splash-image.png";

export const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 500);

    const exitTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <img src={SplashImage} alt="Splash" className="splash-image" />
    </div>
  );
};
