import React, { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

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

      <section className="flex flex-col lg:flex-row p-4 lg:pl-24 lg:pr-24 mt-12 flex-grow">
        <section className="bg-white rounded-lg p-6 w-full lg:w-64 mb-8 lg:mb-0 lg:mr-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-5">Categories</h3>
            {["Perfume", "Trousers", "Shoe", "HandBag", "Hat", "Thermos"].map(
              (category) => (
                <div key={category} className="mb-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    {category}
                  </label>
                  <hr className="border-gray-200 my-3" />
                </div>
              )
            )}

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
          </div>
        </section>

        <div className="w-full lg:w-64 mb-8 lg:mb-0 lg:ml-8 order-1 lg:order-2">
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

        <section className="flex-1 order-2 lg:order-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-x-70 mt-8 justify-center">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductCard
                key={index}
                imageUrl="/src/assets/short.png"
                altText={`Product ${index + 1}`}
                title="Classic Monochrome Tees"
                price="$27.00"
                status="In Stock"
              />
            ))}
          </div>

          <div className="flex justify-center items-center mt-12">
            <div
              className="flex items-center justify-between px-4 py-2 rounded"
              style={{
                width: "152px",
                height: "44px",
                border: "1px solid #E9E9EB",
              }}
            >
              <button className="hover:opacity-80 transition">
                <img
                  src="/src/assets/left.png"
                  alt="Previous page"
                  className="w-6 h-6"
                />
              </button>

              <div
                className="flex items-center justify-center text-sm font-medium text-gray-700"
                style={{
                  width: "40px",
                  height: "32px",
                  backgroundColor: "#F6F6F6",
                  borderRadius: "4px",
                }}
              >
                1
              </div>

              <button className="hover:opacity-80 transition">
                <img
                  src="/src/assets/rigth.png"
                  alt="Next page"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </section>
      </section>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Listing;