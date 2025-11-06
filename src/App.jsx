import "./App.css";

import { HashRouter, Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Saved from "./components/Saved";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
