import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Product = () => {
  return (
    <div>
      <Header />

     
      <section className="flex items-center p-4 pl-4 xl:pl-32">
        <span className="mr-2 font-bold">Ecommerce</span>
        <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
        <span>Black man t-shirt</span>
      </section>

      
      <div className="flex flex-col lg:flex-row ml-8 xl:ml-32 mt-4 space-y-4 lg:space-y-0 lg:space-x-8">
       
        <div className="bg-[#F6F6F6] flex justify-center items-center relative w-full lg:w-[534px] lg:h-[574px] p-4">
          <img
            src="/src/assets/product.png"
            alt="Black Man T-Shirt"
            className="w-full h-auto max-w-[300px] lg:max-w-[400px] lg:max-h-[500px] object-contain mt-[-50px] lg:mt-[-100px]"
          />

          
          <div className="absolute bottom-4 flex space-x-2">
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full cursor-pointer"></div>
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full cursor-pointer"></div>
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full cursor-pointer"></div>
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full cursor-pointer"></div>
          </div>
        </div>

        
        <div className="flex flex-col justify-start">
         
          <div className="flex items-center space-x-8">
            <h2 className="text-3xl font-bold">Raw Black T-Shirt Lineup</h2>
            <img
              src="/src/assets/Share.png"
              alt="Compartilhar"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          
          <div className="flex items-center space-x-4 mt-4">
            
            <div
              className="bg-[#F6F6F6] flex items-center px-3"
              style={{
                width: "167px",
                height: "28px",
                borderRadius: "100px",
              }}
            >
              <img
                src="/src/assets/star.png"
                alt="Star"
                className="w-4 h-[15px] mr-2"
              />
              <span className="text-xs text-gray-700">4.2 — 54 Reviews</span>
            </div>

           
            <div className="w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">
              <p className="text-xs text-gray-700">In Stock</p>
            </div>
          </div>

          
          <div className="mt-4">
            <p className="text-[18px] text-gray-800 font-medium">$75.00</p>
          </div>

         
          <div className="mt-4">
            <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
              Available Colors
            </p>
          </div>

          
          <div className="flex space-x-3 mt-2">
            <div className="w-6 h-6 rounded-full bg-black cursor-pointer border border-gray-300"></div>
            <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer border border-gray-300"></div>
            <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border border-gray-300"></div>
          </div>

        
          <div className="mt-4">
            <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
              Select Size
            </p>
          </div>

          
          <div className="flex space-x-3 mt-2">
            <div className="w-[40px] h-[40px] border border-[#E6E7E8] flex items-center justify-center">
              <span className="text-[14px]" style={{ color: "#5C5F6A" }}>S</span>
            </div>
            <div className="w-[40px] h-[40px] border border-[#E6E7E8] flex items-center justify-center">
              <span className="text-[14px]" style={{ color: "#5C5F6A" }}>M</span>
            </div>
            <div className="w-[40px] h-[40px] border border-[#E6E7E8] flex items-center justify-center">
              <span className="text-[14px]" style={{ color: "#5C5F6A" }}>L</span>
            </div>
            <div className="w-[40px] h-[40px] border border-[#E6E7E8] flex items-center justify-center">
              <span className="text-[14px]" style={{ color: "#5C5F6A" }}>XL</span>
            </div>
            <div className="w-[40px] h-[40px] border border-[#E6E7E8] flex items-center justify-center">
              <span className="text-[14px]" style={{ color: "#5C5F6A" }}>XXL</span>
            </div>
          </div>

          
          <div className="mt-4">
            <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
              Quantity
            </p>
          </div>

         
          <div className="mt-2">
            <div className="w-[164px] h-[44px] border border-[#E6E7E8] flex items-center justify-between px-4">
              <img
                src="/src/assets/Minus.png"
                alt="Minus"
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-[14px]">1</span>
              <img
                src="/src/assets/Add.png"
                alt="Plus"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>

          
          <div className="mt-4">
            <button className="w-[284px] h-[44px] bg-[#0E1422] text-white text-[14px]">
              Add to cart
            </button>
          </div>

          
          <div className="mt-2">
            <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
              — Free shipping on orders $100+
            </p>
          </div>
        </div>
      </div>

    
      <div className="flex flex-col lg:flex-row ml-8 xl:ml-32 mt-[248px]">
       
        <div className="bg-[#F6F6F6] rounded-[8px] w-[241px] h-[41px] flex items-center px-3">
          <img
            src="/src/assets/More.png"
            alt="Icon"
            className="w-5 h-5 mr-2"
          />
          <span className="text-[14px]">Details</span>
        </div>

      
        <div className="mt-[16px] lg:mt-0 lg:ml-8 max-w-[727px]">
          <h2 className="text-[16px] font-bold">Detail</h2>
          <p className="text-[14px] mt-2" style={{ color: "#5C5F6A" }}>
            Elevate your everyday style with our Men's Black T-Shirts, the ultimate wardrobe essential for modern men. Crafted with meticulous attention to detail and designed for comfort, these versatile black tees are a must-have addition to your collection. The classic black color never goes out of style. Whether you're dressing up for a special occasion or keeping it casual, these black t-shirts are the perfect choice, effortlessly complementing any outfit.
          </p>
        </div>
      </div>

      <div className="flex flex-col ml-8 xl:ml-32 mt-[300px]">
        <h2 className="text-[24px] font-bold">You might also like</h2>
        <p className="text-[12px]" style={{ color: "#5C5F6A" }}>SIMILAR PRODUCTS</p>
        
        
        <div className="py-10 flex mt-10 justify-start flex-wrap gap-5">
          <ProductCard 
            imageUrl="/src/assets/short.png" 
            altText="Camiseta 1"
            title="Classic Monochrome Tees"
            price="$27.00"
            status="In Stock"
          />
          <ProductCard 
            imageUrl="/src/assets/short.png" 
            altText="Camiseta 2"
            title="Classic Monochrome Tees"
            price="$27.00"
            status="In Stock"
          />
          <ProductCard 
            imageUrl="/src/assets/short.png" 
            altText="Camiseta 3"
            title="Classic Monochrome Tees"
            price="$27.00"
            status="In Stock"
          />
          <ProductCard 
            imageUrl="/src/assets/short.png" 
            altText="Camiseta 4"
            title="Classic Monochrome Tees"
            price="$27.00"
            status="In Stock"
          />
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Product;