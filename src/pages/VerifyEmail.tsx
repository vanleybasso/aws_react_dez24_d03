import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSignUp } from "@clerk/clerk-react";

const VerifyEmail: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    if (!code.trim()) {
      setError("Verification code is required");
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setSuccessMessage("Email verified successfully! Your account has been created.");

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (err: any) {
      
      const errorMessage = err.errors[0].message.includes("is incorrect")
        ? "Invalid code"
        : err.errors[0].message;
      setError(errorMessage);
    }
  };

  return (
    <>
      <Header />

      <h1 className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 sm:pl-[174px] text-primary-heading font-semibold">
        <span>Verify Email</span>
      </h1>

      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold text-sm text-custom">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className=" text-sm text-primary-heading font-semibold">Verify Email</span>
        </div>
      </section>

      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-white pt-8">
        <div className="w-full max-w-sm p-6">
          <h1 className="text-2xl font-bold mb-4 text-primary-heading">Verify Email</h1>
          <form onSubmit={handleVerify}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-custom-button cursor-pointer text-white py-2 rounded-md hover:bg-gray-800 text-sm font-medium mt-4"
            >
              Verify
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

export default VerifyEmail;