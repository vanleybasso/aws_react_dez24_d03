import React, { useState } from "react";
import Header from "../components/Header";

const Listing = () => {
  const [value, setValue] = useState(1000);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const percentage = (value / 2000) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <section className="flex items-center p-4 pl-24 bg-gray-100">
        <span className="mr-2 font-bold">Ecommerce</span>
        <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
        <span>Search</span>
      </section>

      
      <section className="flex flex-col lg:flex-row p-4 lg:pl-24 lg:pr-24 mt-12">
        
        <section className="bg-white border border-gray-200 rounded-lg p-6 w-full lg:w-64 mb-8 lg:mb-0 lg:mr-8">
          <h3 className="font-bold mb-5">Categories</h3>
          {["Perfume", "Trousers", "Shoe", "HandBag", "Hat", "Thermos"].map((category) => (
            <div key={category} className="mb-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                {category}
              </label>
              <hr className="border-gray-200 my-3" />
            </div>
          ))}

          <h4 className="font-bold mb-5 mt-5">Price</h4>

         
          <div className="relative w-full">
            <input
              type="range"
              min="1"
              max="2000"
              step="1"
              value={value}
              onChange={handleSliderChange}
              className="w-full mb-10 appearance-none h-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-200"
              style={{
                background: `linear-gradient(to right, #878A92 0%, #878A92 ${percentage}%, #E6E7E8 ${percentage}%, #E6E7E8 100%)`,
              }}
            />
            <style>
              {`
                input[type="range"]::-webkit-slider-runnable-track {
                  background-color: transparent;
                  height: 8px;
                  border-radius: 8px;
                }
                input[type="range"]::-webkit-slider-thumb {
                  background-color: #000;
                  border: none;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  cursor: pointer;
                  appearance: none;
                  margin-top: -4px;
                }
              `}
            </style>

            
            <div
              className="absolute top-8 transform -translate-x-1/2 bg-black text-white w-20 h-7 flex items-center justify-center text-xs border border-gray-200 rounded-full"
              style={{ left: `${percentage}%` }}
            >
              ${value}
            </div>
          </div>
        </section>

        
        <section className="flex-1">
          <h3 className="font-bold text-sm">Applied Filters:</h3>

          
          <div className="flex flex-wrap gap-2 mt-3">
            {["Perfume", "$ 890,00"].map((filter, index) => (
              <div
                key={index}
                className="flex items-center border border-gray-200 rounded-full px-3 py-2"
              >
                <span>{filter}</span>
                <img
                  src="/src/assets/close.png"
                  alt="Remove filter"
                  className="w-4 h-4 ml-2 cursor-pointer"
                />
              </div>
            ))}
          </div>

          
          <div className="mt-7 text-xs text-black">
            Showing 1-9 of 36 results.
          </div>
        </section>

        
        <div className="w-full lg:w-64 mt-8 lg:mt-0 lg:ml-8">
          <div className="flex items-center border border-gray-200 rounded-lg p-2 bg-white">
            <img
              src="/src/assets/Search.png"
              alt="Search"
              className="w-5 h-5 mr-2"
            />
            <input
              type="text"
              placeholder="Search products"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listing;