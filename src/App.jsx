import "./App.css";

import { HashRouter, Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Saved from "./components/Saved";
import Preference from "./components/Preference";

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Navigation />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/preference" element={<Preference />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
