import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  return (
    <header className="w-full">
      <div className="bg-custom-banner text-white text-center py-2 text-sm">
        Get 25% OFF on your first order.{" "}
        <Link to="/listing" className="underline">
          Order Now
        </Link>
      </div>

      <nav className="flex justify-between items-center p-4 bg-white shadow-md relative">
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

        <div className="flex items-center gap-2">
          <img src="/src/assets/Logomark.png" alt="Logo" className="h-8" />
          <span className="text-lg font-semibold">Ecommerce</span>
        </div>

        <ul className="hidden md:flex gap-6 text-gray-700 flex-grow justify-center">
          <li>
            <Link to="/" className="hover:text-black text-custom">
              Home
            </Link>
          </li>
          <li>
            <Link to="/listing" className="hover:text-black text-custom">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-black text-custom">
              About
            </Link>
          </li>
        </ul>

        <div className="flex gap-4 md:ml-auto mr-4 items-center">
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <img
              src="/src/assets/car.png"
              alt="Carrinho"
              className="w-5 h-5"
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
              className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold cursor-pointer overflow-hidden"
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-700">
                  {user.firstName ? user.firstName[0] : "U"}
                </span>
              )}
            </div>
          ) : (
            <img
              src="/src/assets/perfil.png"
              alt="Usuário"
              className="w-5 h-5 cursor-pointer"
              onClick={handleUserIconClick}
            />
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white shadow-md py-2 absolute w-full z-10">
          <li>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/listing"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-black"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-black"
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