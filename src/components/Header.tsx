import { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      
      <div className="bg-black text-white text-center py-2 text-sm">
        Get 25% OFF on your first order. <a href="#" className="underline">Order Now</a>
      </div>

      
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
       
        <div className="md:hidden ml-4"> 
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mt-2">
            {isMenuOpen ? (
              <X className="w-6 h-6" /> 
            ) : (
              <Menu className="w-6 h-6" /> 
            )}
          </button>
        </div>

        
        <div className="hidden md:flex items-center gap-2">
          <img src="/src/assets/Logomark.png" alt="Logo" className="h-8" />
          <span className="text-lg font-semibold">Ecommerce</span>
        </div>

      
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li><a href="#" className="hover:text-black">Home</a></li>
          <li><a href="#" className="hover:text-black">Shop</a></li>
          <li><a href="#" className="hover:text-black">About</a></li>
        </ul>

       
        <div className="flex gap-4">
          <img src="/src/assets/car.png" alt="Carrinho" className="w-5 h-5 cursor-pointer" /> 
          <img src="/src/assets/perfil.png" alt="Usuário" className="w-5 h-5 cursor-pointer" /> 
        </div>
      </nav>

     
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white shadow-md py-2">
          <li><a href="#" className="block py-2 text-gray-700 hover:text-black">Home</a></li>
          <li><a href="#" className="block py-2 text-gray-700 hover:text-black">Shop</a></li>
          <li><a href="#" className="block py-2 text-gray-700 hover:text-black">About</a></li>
        </ul>
      )}
    </header>
  );
};

export default Header;
