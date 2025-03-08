import React from "react";

interface ProductCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  price: string;
  status: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, altText, title, price, status }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
      <p className="text-left text-sm mt-2">{title}</p>
      <div className="flex items-center mt-1">
        <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">
          {status}
        </p>
        <p className="ml-4 text-left text-sm font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
