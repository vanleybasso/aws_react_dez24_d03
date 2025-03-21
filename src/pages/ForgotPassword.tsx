import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext"; 

const ForgotPassword: React.FC = () => {
  const { isLoaded, signIn } = useSignIn();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true); 
    setError("");
    setSuccess("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setSuccess("We sent a code to your email!");
      localStorage.setItem("reset_email", email);
      navigate("/reset-password");
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Error sending code.");
    } finally {
      setIsLoading(false); 
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <Header />

      <h1
        className={`text-left text-2xl pl-4 pt-6 pb-2 mb-0 sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } text-primary-heading font-semibold`}
      >
        <span className={`${isDarkMode ? "text-white" : "text-primary-heading"}`}>Forgot Password</span>
      </h1>

      <section
        className={`flex items-center p-4 pt-0 pb-4 sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          <span className={`mr-2 font-bold text-sm ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
            Ecommerce
          </span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
            Forgot Password
          </span>
        </div>
      </section>

      <div className={`flex justify-center items-center ${isDarkMode ? "bg-black" : "bg-white"} mt-16 mb-16 px-4`}>
        <div className="w-full max-w-sm p-6">
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-custom-gray"} mb-6`}>
            Enter your email to receive a reset code.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                className={`mt-1 block w-full px-3 py-2 border ${
                  isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"
                } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className={`w-full px-4 py-2 ${
                isDarkMode
                  ? "bg-[#0E1422] text-white" 
                  : "bg-[#0E1422] text-white" 
              } rounded-md text-sm cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center justify-center`}
              disabled={isLoading} 
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send code"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-30">
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;