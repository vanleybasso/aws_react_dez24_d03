import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '@clerk/clerk-react'; 
import { useNavigate } from 'react-router-dom'; 

const Cart: React.FC = () => {
  const { isSignedIn } = useUser(); 
  const navigate = useNavigate(); 

  const handleCheckout = () => {
    if (!isSignedIn) {
      navigate('/login'); 
    } else {
     
      console.log('Proceed to checkout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <h1
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: 'normal' }}
      >
        <span className="inline-block">Cart</span>
      </h1>

      <section className="flex items-center p-4 pl-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span>Cart</span>
        </div>
      </section>

      <main className="flex flex-col lg:flex-row pl-4 sm:pl-[174px] pr-4 py-10 bg-white sm:pr-20 flex-grow">
        <div className="w-full lg:w-2/3 pr-10 mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold mb-4">Your cart</h2>

          <div className="w-full h-px bg-[#E9E9EB] mb-6" />

          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center bg-[#F6F6F6] rounded mr-4 hidden lg:flex">
                <img
                  src="/src/assets/product.png"
                  alt="Raw Black T-Shirt Lineup"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Raw Black T-Shirt Lineup</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  Color: <span className="inline-block w-3 h-3 bg-black rounded-full mx-1"></span>
                  <div className="w-4 h-px bg-[#5C5F6A] inline-block mx-2"></div>
                  Size: M
                </p>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-6">$75.00</span>
                <div className="w-[140px] h-[44px] border border-[#E6E7E8] flex items-center justify-between px-4">
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
                <div className="w-[40px] h-[40px] bg-[#F6F6F6] flex items-center justify-center ml-4 rounded-[4px] cursor-pointer">
                  <img
                    src="/src/assets/close.png"
                    alt="Close"
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center bg-[#F6F6F6] rounded mr-4 hidden lg:flex">
                <img
                  src="/src/assets/product.png"
                  alt="Essential Neutrals"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Essential Neutrals</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  Color: <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mx-1"></span>
                  <div className="w-4 h-px bg-[#5C5F6A] inline-block mx-2"></div>
                  Size: M
                </p>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-6">$22.00</span>
                <div className="w-[140px] h-[44px] border border-[#E6E7E8] flex items-center justify-between px-4">
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
                <div className="w-[40px] h-[40px] bg-[#F6F6F6] flex items-center justify-center ml-4 rounded-[4px] cursor-pointer">
                  <img
                    src="/src/assets/close.png"
                    alt="Close"
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 border border-[#E6E7E8] rounded p-6 h-fit">
          <h2 className="text-lg font-semibold mb-10">Order Summary</h2>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$90.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$3.00</span>
            </div>
            <div className="border-t border-t-[#E6E7E8] pt-4 mb-6 flex justify-between font-medium text-black">
              <span>Total</span>
              <span>$100.00</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition"
          >
            {isSignedIn ? 'Checkout' : 'Login to Checkout'}
          </button>

          <button className="w-full text-center text-sm text-gray-500 mt-8 hover:underline">
            Continue Shopping
          </button>
        </div>
      </main>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;