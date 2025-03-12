import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  
  const handleUserIconClick = () => {
    if (!user) {
      navigate("/login"); 
    } else {
      navigate("/account-details");
    }
  };

  return (
    <header className="w-full">
    
      <div className="bg-black text-white text-center py-2 text-sm">
        Get 25% OFF on your first order.{" "}
        <a href="#" className="underline">
          Order Now
        </a>
      </div>

     
      <nav className="flex justify-between items-center p-4 bg-white shadow-md relative">
       
        <div className="md:hidden ml-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mt-2 focus:outline-none"
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
            <Link to="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <Link to="/listing" className="hover:text-black">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-black">
              About
            </Link>
          </li>
        </ul>

       
        <div className="flex gap-4 md:ml-auto mr-4 items-center">
          <img
            src="/src/assets/car.png"
            alt="Carrinho"
            className="w-5 h-5 cursor-pointer"
          />

          {user ? (
            <div
              onClick={handleUserIconClick}
              className="w-6 h-6 rounded-full bg-[#F0F1FF] flex items-center justify-center text-sm font-semibold cursor-pointer overflow-hidden"
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user.firstName ? user.firstName[0] : "U"}</span>
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
              to="/products"
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