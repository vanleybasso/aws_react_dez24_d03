// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Product from "./pages/Product"; // Importe a nova página Product

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/product" element={<Product />} /> {/* Nova rota */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
