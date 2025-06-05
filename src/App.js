import "./App.css";
import React, { useEffect, useState } from "react";
import { SplashScreen } from "./components/SplashScreen/SplashScreen";
import { BrowserRouter as Router } from "react-router-dom"; 
import AppRoutes from "./config/router"; 


function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    setShowSplash(true);
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
