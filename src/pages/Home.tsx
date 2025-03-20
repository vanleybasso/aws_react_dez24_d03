import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../components/ThemeContext";

interface Product {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  price: string;
  status: string;
  rating?: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const handleViewCollectionClick = () => {
    navigate("/listing");
  };

  const handleStartBrowsingClick = () => {
    navigate("/listing");
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <Header />

      
      <section className={`${isDarkMode ? "bg-black" : "bg-[#F6F6F6]"} pt-20 pb-0 px-10 flex flex-col lg:flex-row items-center justify-between relative`}>
        <div className="max-w-xl lg:ml-[182px] text-center lg:text-left">
          <h1 className={`custom-text-32 font-bold mb-2 ${isDarkMode ? "text-white" : "text-dark"}`}>
            Fresh Arrivals Online
          </h1>
          <p className={`text-sm mb-6 mt--2 ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
            Discover Our Newest Collection Today.
          </p>
          <button
            className="text-sm bg-custom-button text-white py-2 px-6 rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 button-border cursor-pointer flex items-center gap-2"
            onClick={handleViewCollectionClick}
          >
            View Collection
            <img
              src="/src/assets/Arrow-Right.png"
              alt="Ícone de coleção"
              className="w-6 h-6"
            />
          </button>
        </div>

        <div className="relative w-full lg:w-1/3 mt-10 lg:mt-0">
          <div className="absolute bottom-[10px] left-[-80px] w-[340px] h-[340px] bg-[url('/src/assets/Ellipse.png')] bg-cover bg-center rounded-full z-0 lg:block hidden"></div>
          <img
            src="/src/assets/pucker.png"
            alt="Star"
            className="absolute top-[10px] left-[-60px] w-[38px] h-[38px] z-10 lg:block hidden"
          />
          <img
            src="/src/assets/imagehero.png"
            alt="New Arrival"
            className="w-[255px] h-[382px] mx-auto lg:mx-0 relative z-10 lg:block hidden"
          />
        </div>
      </section>

      
      <section className="px-10 lg:ml-[182px] mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="flex flex-col items-start">
          <img
            src="/src/assets/truck.png"
            alt="Free Shipping Icon"
            className={`w-6 h-6 mb-4 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
          />
          <h2 className={`text-base font-bold mb-2 ${isDarkMode ? "text-white" : "text-dark"}`}>
            Free Shipping
          </h2>
          <p className={`text-sm max-w-md ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
            Upgrade your style today and get FREE
            <br />
            shipping on all orders! Don't miss out.
          </p>
        </div>

        <div className="flex flex-col items-start">
          <img
            src="/src/assets/satisfation.png"
            alt="Satisfaction Guarantee Icon"
            className={`w-6 h-6 mb-4 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
          />
          <h2 className={`text-base font-bold mb-2 ${isDarkMode ? "text-white" : "text-dark"}`}>
            Satisfaction Guarantee
          </h2>
          <p className={`text-sm max-w-md ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
            Shop confidently with our Satisfaction
            <br />
            Guarantee: Love it or get a refund.
          </p>
        </div>

        <div className="flex flex-col items-start">
          <img
            src="/src/assets/security.png"
            alt="Secure Payment Icon"
            className={`w-6 h-6 mb-4 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
          />
          <h2 className={`text-base font-bold mb-2 ${isDarkMode ? "text-white" : "text-dark"}`}>
            Secure Payment
          </h2>
          <p className={`text-sm max-w-md ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
            Your security is our priority. Your
            <br />
            payments are secure with us.
          </p>
        </div>
      </section>

      
      <section className="py-20 px-10 text-center mt-16">
        <h2 className={`text-[12px] mb-2 ${isDarkMode ? "text-gray-300" : "text-shop-now"}`}>
          SHOP NOW
        </h2>
        <h3 className={`text-[24px] font-bold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
          Best Selling
        </h3>
      </section>

      <section className="py-10 px-10 flex mt-4 justify-center flex-wrap gap-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            altText={product.altText}
            title={product.title}
            price={product.price}
            status={product.status}
          />
        ))}
      </section>

      
      <section className={`${isDarkMode ? "bg-black" : "bg-gradient-to-r from-[#F2F2F2] to-white"} py-20 px-10 lg:pl-[174px] lg:pr-[213px] flex items-center justify-between mt-28`}>
        <div className="text-left">
          <h2 className={`text-[24px] font-bold mb-4 ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
            Browse Our Fashion Paradise!
          </h2>
          <p className={`text-[14px] mb-6 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
            Step into a world of style and explore our diverse collection of
            <br />
            clothing categories.
          </p>
          <button
            className="text-white py-2 px-6 rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 flex items-center bg-custom-button text-sm cursor-pointer gap-2"
            onClick={handleStartBrowsingClick}
          >
            Start Browsing
            <img
              src="/src/assets/Arrow-Right.png"
              alt="Ícone de navegação"
              className={`w-6 h-6 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
            />
          </button>
        </div>

        <div className="w-[125px] h-[225px] hidden lg:block">
          <img
            src="/src/assets/category.png"
            alt="Fashion Paradise"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>

      
      <section className="py-10 px-10 flex flex-col mt-20 items-center justify-center gap-10">
        <div className="flex items-center justify-center">
          <span className={`text-sm font-medium ${
            isDarkMode
              ? "text-xs w-[89px] h-[28px] border border-gray-600 text-gray-200 rounded-full flex items-center justify-center font-semibold"
              : "text-[#202533] border border-[#E9E9EB] rounded-[100px] py-1 px-4"
          }`}>
            On Offer
          </span>
        </div>

        <div className="flex justify-center flex-wrap gap-5">
          {products.slice(4, 8).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              altText={product.altText}
              title={product.title}
              price={product.price}
              status={product.status}
            />
          ))}
        </div>
      </section>

      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Home;