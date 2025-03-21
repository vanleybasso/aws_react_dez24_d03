import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

interface ProductCardProps {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  price: number | string; 
  status: string;
  onEditClick?: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, altText, title, price, status, onEditClick }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);

  return (
   <div
  className={`flex flex-col items-start mx-2 w-[200px] sm:w-[248px] ${
    isDarkMode ? "text-white" : "text-gray-700"
  }`}
>
 
  <div
    className={`w-full h-[250px] sm:h-[312px] ${
      isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"
    } flex items-center justify-center cursor-pointer`}
    onClick={handleClick}
  >
    <img
      src={imageUrl}
      alt={altText}
      className="max-w-[80%] max-h-[80%] object-contain"
    />
  </div>

  
  <div className="flex items-center justify-between w-full mt-2">
    <p
      className={`text-left text-sm whitespace-nowrap ${
        isDarkMode ? "text-white" : "text-primary-heading"
      } font-semibold cursor-pointer`}
      onClick={handleClick}
    >
      {title}
    </p>
    {onEditClick && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEditClick();
        }}
        className={`flex items-center text-sm ${
          isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
        } transition-all duration-200 cursor-pointer`}
        title="Edit product"
      >
        <img
          src="/src/assets/pencil.png"
          alt="Editar"
          className={`w-4 h-4 mr-1 hover:scale-105 transition-transform duration-200 ${
            isDarkMode ? "filter invert" : ""
          }`}
        />
        <span className="hover:scale-105 transition-transform duration-200">Edit</span>
      </button>
    )}
  </div>

  
  <div className="flex items-center mt-1">
    <p className={`text-left text-xs w-[89px] h-[28px] border ${
      isDarkMode ? "border-gray-600 text-gray-200" : "border-gray-400 text-primary-heading"
    } rounded-full flex items-center justify-center font-semibold`}>
      {status}
    </p>

    <p className={`ml-4 text-left text-sm ${
      isDarkMode ? "text-gray-300" : "text-custom-gray"
    }`}>
      ${formattedPrice}
    </p>
  </div>
</div>
  );
};

export default ProductCard;