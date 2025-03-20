import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../components/ThemeContext';

const AfterPayment: React.FC = () => {
  const navigate = useNavigate(); 
  const { isDarkMode } = useTheme();

  const handleGoToAccount = () => {
    navigate('/orders');
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <Header />

      <h1
        className={`text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-[#D5E5D7]"
        }`}
        style={{ lineHeight: 'normal' }}
      >
        <span className={`inline-block font-semibold ${
          isDarkMode ? "text-white" : "text-primary-heading"
        }`}>
          Successful Order
        </span>
      </h1>

      <section
        className={`flex items-center p-4 pl-4 pt-0 pb-4 sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-[#D5E5D7]"
        }`}
      >
        <div className="flex items-center">
          <span className={`mr-2 font-bold text-sm ${
            isDarkMode ? "text-gray-300" : "text-custom"
          }`}>
            Ecommerce
          </span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className={`text-sm font-semibold ${
            isDarkMode ? "text-white" : "text-primary-heading"
          }`}>
            Successful Order
          </span>
        </div>
      </section>

      <section className="flex justify-center py-8 mt-[179px]">
      <img
  src="/src/assets/Group.png"
  alt="Imagem de sucesso"
  className={`max-w-full h-auto ${isDarkMode ? "filter brightness-0 invert" : ""}`}
/>
      </section>

      <section className="flex justify-center mt-2">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? "text-white" : "text-primary-heading"
        }`}>
          Thank you for shopping
        </h2>
      </section>

      <section className="flex justify-center mt-4">
        <p className={`text-center ${
          isDarkMode ? "text-gray-300" : "text-custom"
        }`} style={{ fontSize: '14px' }}>
          Your order has been successfully placed and is now<br />
          being processed.
        </p>
      </section>

      <section className="flex justify-center mt-10">
        <button
          onClick={handleGoToAccount}
          className={`bg-custom-button text-white py-2 px-6 rounded-md hover:bg-gray-800 cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform duration-200 ${
            isDarkMode ? "bg-gray-700" : "bg-custom-button"
          }`}
        >
          Go to my account
          <img
            src="/src/assets/Arrow-Right.png" 
            alt="Ícone"
            className={`w-6 h-6 ${isDarkMode ? "filter brightness-0 invert" : ""}`} 
          />
        </button>
      </section>

      <div className="mt-30">
        <Footer />
      </div>
    </div>
  );
};

export default AfterPayment;