import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Product from "./pages/Product";
import Cart from "./pages/Cart"; 

const App: React.FC = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
