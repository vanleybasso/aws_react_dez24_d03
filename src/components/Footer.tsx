import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useUser } from "@clerk/clerk-react"; 
import { useSelector } from "react-redux"; 
import { RootState } from "../redux/store"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { isSignedIn } = useUser(); 
  const cartItems = useSelector((state: RootState) => state.cart.items); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSuccess("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setError("We couldn't subscribe your email at this moment. Please try again later.");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAccountClick = () => {
    if (!isSignedIn) {
      navigate("/login"); 
    } else {
      navigate("/account-details"); 
    }
  };

  const handleCheckoutClick = () => {
    if (!isSignedIn) {
      navigate("/login"); 
    } else if (cartItems.length === 0) {
      navigate("/listing"); 
    } else {
      navigate("/checkout"); 
    }
  };

  return (
    <footer className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <div className={`${isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"} py-8`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 md:pl-[40px]">
            <h2 className={`text-xl font-bold mb-2 md:mb-4 ${isDarkMode ? "text-white" : "text-dark"}`}>
              Join Our Newsletter
            </h2>
            <p className={`mb-4 md:mb-6 text-sm ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
              We love to surprise our subscribers with occasional gifts.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-2 md:w-1/2">
            <div className="w-full flex justify-center gap-2">
              <input
                type="text"
                placeholder="Your email address"
                aria-invalid={!!error}
                className={`px-4 py-2 border ${
                  error ? "border-red-500" : isDarkMode ? "border-gray-600" : "border-gray-300"
                } rounded-lg focus:outline-none focus:border-black w-2/3 placeholder-gray-500 ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-custom-button text-white rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-sm cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          </form>
        </div>
      </div>

      <div className={`${isDarkMode ? "bg-black" : "bg-white"} py-8`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:pl-[50px]">
          <div>
            <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
              <img
                src={isDarkMode ? "/src/assets/logo-favicon2.svg" : "/src/assets/logo-favicon.svg"}
                alt="Logo"
                className="h-10 mr-2"
              />
              <span className="text-lg font-semibold">Hype</span>
            </div>
            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
              Urban fashion, authentic style. The trends <br /> you love, with the attitude you live!
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <img
                  src="/src/assets/github.png"
                  alt="GitHub"
                  className={`h-6 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <img
                  src="/src/assets/instagram.png"
                  alt="Instagram"
                  className={`h-6 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <img
                  src="/src/assets/youtube.png"
                  alt="YouTube"
                  className={`h-6 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
                />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-18 mt-6 md:mt-0">
            <div>
              <h3 className={`text-lg font-semibold mb-5 text-sm ${isDarkMode ? "text-gray-300" : "text-shop-now"}`}>
                SUPPORT
              </h3>
              <ul className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                <li>
                  <Link to="/faq" className="hover:text-gray-500 transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gray-500 transition-colors duration-200">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-gray-500 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-5 text-sm ${isDarkMode ? "text-gray-300" : "text-shop-now"}`}>
                COMPANY
              </h3>
              <ul className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                <li>
                  <Link to="/about" className="hover:text-gray-500 transition-colors duration-200">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-500 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-gray-500 transition-colors duration-200">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-5 text-sm ${isDarkMode ? "text-gray-300" : "text-shop-now"}`}>
                SHOP
              </h3>
              <ul className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                <li>
                  <button
                    onClick={handleAccountClick} 
                    className="hover:text-gray-500 transition-colors duration-200 text-left w-full cursor-pointer"
                  >
                    My Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleCheckoutClick} 
                    className="hover:text-gray-500 transition-colors duration-200 text-left w-full cursor-pointer"
                  >
                    Checkout
                  </button>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-gray-500 transition-colors duration-200">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className={`font-semibold mb-8 text-sm ${isDarkMode ? "text-gray-300" : "text-shop-now"}`}>
              ACCEPTED PAYMENTS
            </h3>
            <div className="flex gap-8">
              <img
                src="/src/assets/Mastercard.png"
                alt="MasterCard"
                className={`h-6 ${isDarkMode ? "filter brightness-0 invert" : "filter brightness-0 saturate(0) opacity-75"}`}
                style={!isDarkMode ? { filter: "brightness(0) saturate(100%) invert(39%) sepia(6%) saturate(747%) hue-rotate(182deg) brightness(93%) contrast(86%)" } : {}}
              />
              <img
                src="/src/assets/Amex.png"
                alt="Amex"
                className={`h-6 ${isDarkMode ? "filter brightness-0 invert" : "filter brightness-0 saturate(0) opacity-75"}`}
                style={!isDarkMode ? { filter: "brightness(0) saturate(100%) invert(39%) sepia(6%) saturate(747%) hue-rotate(182deg) brightness(93%) contrast(86%)" } : {}}
              />
              <img
                src="/src/assets/Visa.png"
                alt="Visa"
                className={`h-6 ${isDarkMode ? "filter brightness-0 invert" : "filter brightness-0 saturate(0) opacity-75"}`}
                style={!isDarkMode ? { filter: "brightness(0) saturate(100%) invert(39%) sepia(6%) saturate(747%) hue-rotate(182deg) brightness(93%) contrast(86%)" } : {}}
              />
            </div>
          </div>
        </div>

        <div className={`text-center mt-30 mb-0 text-sm ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
          © {currentYear} Hype. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;