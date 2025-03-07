// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing"; // Importe a nova página Listing

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} /> {/* Nova rota */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
