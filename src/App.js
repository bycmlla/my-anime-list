import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/router";


function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
