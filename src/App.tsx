// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AfterPayment from "./pages/AfterPayment";
import Orders from "./pages/Orders";
import AccountDetails from "./pages/AccountDetails";  

const App: React.FC = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/afterpayment" element={<AfterPayment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account-details" element={<AccountDetails />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
