import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForgotPassword: React.FC = () => {
  return (
    <>
      <Header />

      
      <h1
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: "normal" }}
      >
        <span className="inline-block">Forgot Password</span>
      </h1>

      
      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span>Forgot Password</span>
        </div>
      </section>

      
      <div className="flex justify-center items-center bg-white mt-16 mb-16 px-4">
        <div className="w-full max-w-sm p-6">
          <p className="text-sm text-gray-600 mb-6">
            Please enter the email address associated with your account. We'll promptly
            send you a link to reset your password.
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
            >
              Send reset link
            </button>
          </form>
        </div>
      </div>

      
      <div className="mt-30">
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
