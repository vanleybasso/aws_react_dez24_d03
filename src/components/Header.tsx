import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTheme } from "./ThemeContext"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { isDarkMode, toggleTheme } = useTheme(); 

  const totalItemsInCart = cartItems.length;

  const handleUserIconClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/account-details");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className={`w-full ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      
      <div className={`${isDarkMode ? "bg-gray-800" : "bg-custom-banner"} text-white text-center py-2 text-sm`}>
        Get 25% OFF on your first order.{" "}
        <Link to="/listing" className="underline">
          Order Now
        </Link>
      </div>

      
      <nav className="flex justify-between items-center p-4 shadow-md relative">
        
        <div className="md:hidden ml-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mt-2 focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

       
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <img 
            src={isDarkMode ? "/src/assets/logo-favicon2.svg" : "/src/assets/logo-favicon.svg"} 
            alt="Logo" 
            className="h-8" 
          />
          <span className="text-lg font-semibold">Hype</span>
        </div>

        
        <ul className="hidden md:flex gap-6 flex-grow justify-center">
          <li>
            <Link
              to="/"
              className={`${isDarkMode ? "text-gray-300 hover:text-gray-500" : "text-custom hover:text-gray-500"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/listing"
              className={`${isDarkMode ? "text-gray-300 hover:text-gray-500" : "text-custom hover:text-gray-500"}`}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${isDarkMode ? "text-gray-300 hover:text-gray-500" : "text-custom hover:text-gray-500"}`}
            >
              About
            </Link>
          </li>
        </ul>

       
        <div className="flex gap-4 md:ml-auto mr-4 items-center">
         
          <button
            onClick={toggleTheme}
            className="focus:outline-none transform transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-black"}`} /> 
            ) : (
              <Moon  className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-black"}`} />
            )}
          </button>
          

          
          <div
            className="relative cursor-pointer transform transition-transform duration-300 hover:scale-110"
            onClick={handleCartClick}
          >
            <img
              src="/src/assets/car.png"
              alt="Carrinho"
              className={`w-5 h-5 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
            />
            {totalItemsInCart > 0 && (
              <span
                className="absolute top-4 -right-2 text-white text-[10px] rounded-full px-1.5 py-0.5 flex items-center justify-center w-4 h-4"
                style={{ backgroundColor: "#BE1313" }}
              >
                {totalItemsInCart}
              </span>
            )}
          </div>

          
          {user ? (
            <div
              onClick={handleUserIconClick}
              className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-110"
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className={`${isDarkMode ? "text-gray-700" : "text-gray-700"}`}>
                  {user.firstName ? user.firstName[0] : "U"}
                </span>
              )}
            </div>
          ) : (
            <div
              className="transform transition-transform duration-300 hover:scale-110"
              onClick={handleUserIconClick}
            >
              <img
                src="/src/assets/perfil.png"
                alt="Usuário"
                className={`w-5 h-5 cursor-pointer ${isDarkMode ? "filter brightness-0 invert" : ""}`}
              />
            </div>
          )}
        </div>
      </nav>

      
      {isMenuOpen && (
        <ul className={`md:hidden flex flex-col items-center shadow-md py-2 absolute w-full z-10 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700"
        }`}>
          <li>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 ${isDarkMode ? "text-gray-300 hover:text-gray-500" : "text-gray-700 hover:text-gray-500"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/listing"
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 ${isDarkMode ? "text-gray-300 hover:text-gray-500" : "text-gray-700 hover:text-gray-500"}`}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 ${isDarkMode ? "text-gray-300 hover:text-gray-500" : "text-gray-700 hover:text-gray-500"}`}
            >
              About
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;