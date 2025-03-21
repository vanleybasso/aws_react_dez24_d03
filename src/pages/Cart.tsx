import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import { useTheme } from "../components/ThemeContext";

const Cart: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false); 

  const shipping = subtotal >= 100 ? "Free" : "No Free";
  const shippingCost = 0;
  const tax = subtotal < 100 ? 10 : 0;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      navigate("/listing");
      return;
    }

    if (!isSignedIn) {
      navigate("/login");
    } else {
      setIsLoading(true); 
      setTimeout(() => {
        setIsLoading(false); 
        navigate("/checkout");
      }, 2000); 
    }
  };

  const handleLoginToCheckout = () => {
    navigate("/login");
  };

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-700"}`}>
      <Header />

      <h1
        className={`text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
        style={{ lineHeight: "normal" }}
      >
        <span className={`inline-block text-2xl font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
          Cart
        </span>
      </h1>

      <section className={`flex items-center p-4 pl-4 pt-0 pb-4 sm:pl-[174px] ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}>
        <div className="flex items-center">
          <span className={`mr-2 font-bold text-sm ${isDarkMode ? "text-gray-300" : "text-custom"}`}>Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>Cart</span>
        </div>
      </section>

      <main className={`flex flex-col lg:flex-row pl-4 sm:pl-[174px] pr-4 py-10 sm:pr-20 flex-grow ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}>
        <div className="w-full lg:w-2/3 lg:pr-10 mb-6 lg:mb-0">
          <h2 className={`text-base font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
            Your cart
          </h2>

          <div className={`w-full h-px mb-6 ${isDarkMode ? "bg-gray-700" : "bg-[#E9E9EB]"}`} />

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center ">
                <div className={`w-20 h-20 flex items-center justify-center rounded mb-4 sm:mb-0 sm:mr-4 ${
                  isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"
                }`}>
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <Link to={`/product/${item.id}`} className={`font-medium hover:underline ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}>
                    {item.title}
                  </Link>
                  <p className={`text-sm flex items-center mt-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}>
                    Color:{" "}
                    <span
                      className="inline-block w-3 h-3 rounded-full mx-1"
                      style={{ backgroundColor: item.selectedColor }}
                    ></span>
                    <div className={`w-4 h-px inline-block mx-2 ${
                      isDarkMode ? "bg-gray-600" : "bg-[#5C5F6A]"
                    }`}></div>
                    Size: {item.selectedSize}
                  </p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0 w-full sm:w-auto">
                  <span className={`font-medium mr-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                    ${Number(item.price).toFixed(2)}
                  </span>
                  <div className={`w-[140px] h-[44px] border flex items-center justify-between px-4 ${
                    isDarkMode ? "border-gray-700" : "border-[#E6E7E8]"
                  }`}>
                    <img
                      src="/src/assets/Minus.png"
                      alt="Minus"
                      className={`w-5 h-5 cursor-pointer ${isDarkMode ? "filter invert-1" : ""}`}
                      onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                    />
                    <span className={`text-[14px] ${isDarkMode ? "text-white" : "text-gray-700"}`}>{item.quantity}</span>
                    <img
                      src="/src/assets/Add.png"
                      alt="Plus"
                      className={`w-5 h-5 cursor-pointer ${isDarkMode ? "filter invert-1" : ""}`}
                      onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                    />
                  </div>
                  <div
                    className={`w-[40px] h-[40px] flex items-center justify-center ml-4 rounded-[4px] cursor-pointer ${
                      isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"
                    }`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <img
                      src="/src/assets/close.png"
                      alt="Close"
                      className={`w-5 h-5 ${isDarkMode ? "filter invert-1" : ""}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`w-full lg:w-1/3 border rounded p-6 h-fit mt-6 lg:mt-0 ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-[#E6E7E8] bg-white"
        }`}>
          <h2 className={`text-base font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
            Order Summary
          </h2>

          <div className={`space-y-4 text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
                {shipping === "Free" ? "Free" : "No Free"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className={`border-t pt-4 mb-6 flex justify-between font-medium ${
              isDarkMode ? "border-gray-700 text-white" : "border-[#E6E7E8] text-black"
            }`}>
              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={isSignedIn ? handleCheckout : handleLoginToCheckout}
            disabled={isLoading} 
            className={`w-full py-3 rounded mt-6 cursor-pointer hover:scale-105 transition-transform duration-200 ${
              isDarkMode
                ? "bg-[#0E1422] text-white"
                : "bg-[#0E1422] text-white"
            } flex items-center justify-center`}
          >
            {isLoading ? ( 
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isSignedIn ? "Checkout" : "Login to Checkout"
            )}
          </button>

          <button
            onClick={() => navigate("/listing")}
            className={`w-full text-center text-[12px] mt-4 underline hover:underline cursor-pointer ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Continue Shopping
          </button>
        </div>
      </main>

      <div className={`mt-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;