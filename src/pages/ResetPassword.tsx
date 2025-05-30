import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTheme } from "../components/ThemeContext"; 

const ResetPassword: React.FC = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  const email = localStorage.getItem("reset_email") || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    const validationErrors: { [key: string]: string } = {};

    if (!code.trim()) {
      validationErrors.code = "Verification code is required.";
    }

    if (!newPassword.trim()) {
      validationErrors.newPassword = "New password is required.";
    } else if (!validatePassword(newPassword)) {
      validationErrors.newPassword =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Password confirmation is mandatory.";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true); 

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.error(err);

      const rawMessage = err.errors?.[0]?.message || "";

      let customMessage = "Error resetting password.";

      if (rawMessage.toLowerCase().includes("code") || rawMessage.toLowerCase().includes("incorrect")) {
        customMessage = "Invalid code, please try again...";
      }

      setErrors({ form: customMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <Header />

      <h1
        className={`text-left text-2xl pl-4 pt-6 pb-2 mb-0 sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } text-primary-heading font-semibold`}
      >
        <span className={`${isDarkMode ? "text-white" : "text-primary-heading"}`}>Reset Password</span>
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
            Reset Password
          </span>
        </div>
      </section>

      <div className={`flex justify-center items-center ${isDarkMode ? "bg-black" : "bg-white"} mt-16 mb-16 px-4`}>
        <div className="w-full max-w-sm p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                Verification code
              </label>
              <input
                type="text"
                id="code"
                placeholder="Enter the 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${
                  isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"
                } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
              />
              {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
            </div>

            <div>
              <label htmlFor="new-password" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                New password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  placeholder="Enter the new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"
                  } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showNewPassword ? (
                    <FaEyeSlash style={{ color: isDarkMode ? "#9CA3AF" : "#474B57" }} />
                  ) : (
                    <FaEye style={{ color: isDarkMode ? "#9CA3AF" : "#474B57" }} />
                  )}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-custom-gray"}`}>
                Confirm new password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"
                  } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash style={{ color: isDarkMode ? "#9CA3AF" : "#474B57" }} />
                  ) : (
                    <FaEye style={{ color: isDarkMode ? "#9CA3AF" : "#474B57" }} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

            <button
              type="submit"
              className={`w-full px-4 py-3 ${
                isDarkMode
                  ? "bg-[#0E1422] hover:bg-[#1a2533]" 
                  : "bg-[#0E1422] hover:bg-[#1a2533]" 
              } text-white rounded-md text-base font-medium cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center justify-center`}
              disabled={isLoading} 
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Reset password"
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

export default ResetPassword;