import "./App.css";
import React, { useEffect, useState } from "react";
import { SplashScreen } from "./components/SplashScreen/SplashScreen";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Importar o Router
import AppRoutes from "./config/router"; 

const SPLASH_INTERVAL = 1000 * 60 * 60 * 6;

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    setShowSplash(true);
    // const lastVisit = localStorage.getItem("lastVisit");
    // const now = Date.now();

    // if (!lastVisit || now - parseInt(lastVisit) > SPLASH_INTERVAL) {
    //   setShowSplash(true);
    //   localStorage.setItem("lastVisit", now.toString());
    // }
  }, []);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <AppRoutes />
        </Router>
      )}
    </div>
  );
}

export default App;
