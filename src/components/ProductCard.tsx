import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext"; 

interface ProductCardProps {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  price: number; 
  status: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, altText, title, price, status }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`flex flex-col items-start mx-2 w-[248px] cursor-pointer ${
        isDarkMode ? "text-white" : "text-gray-700"
      }`}
      onClick={handleClick}
    >
     
      <div className={`w-full h-[312px] ${
        isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"
      } flex items-center justify-center`}>
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>

      
      <p className={`text-left text-sm mt-2 whitespace-nowrap w-full ${
        isDarkMode ? "text-white" : "text-primary-heading"
      } font-semibold`}>
        {title}
      </p>

      
      <div className="flex items-center mt-1">
        
        <p className={`text-left text-xs w-[89px] h-[28px] border ${
          isDarkMode ? "border-gray-600 text-gray-200" : "border-gray-400 text-primary-heading"
        } rounded-full flex items-center justify-center font-semibold`}>
          {status}
        </p>

       
        <p className={`ml-4 text-left text-sm ${
          isDarkMode ? "text-gray-300" : "text-custom-gray"
        }`}>
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;