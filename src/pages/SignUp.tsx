import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSignUp } from "@clerk/clerk-react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const SignUp: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

 
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setError("");

    
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      isValid = false;
    }

    if (!isValid || !isLoaded) return;

    try {
      await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      window.location.href = "/verify-email";
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "An error occurred.");
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/", 
      });
    } catch (err: any) {
      console.error("Erro ao autenticar com Google:", err);
      setError("Erro ao autenticar com Google. Tente novamente.");
    }
  };

  return (
    <>
      <Header />

      <h1
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: "normal" }}
      >
        <span className="inline-block text-primary-heading font-semibold">Sign up</span>
      </h1>

      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold text-sm text-custom">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className="text-sm text-primary-heading font-semibold">Sign up</span>
        </div>
      </section>

      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-sm p-6">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-4 h-4"
            />
            Continue with Google
          </button>

          <div className="my-4 flex items-center justify-center">
            <div className="w-full h-px bg-gray-200"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="w-full h-px bg-gray-200"></div>
          </div>

          
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-custom-gray">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-custom-gray">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-custom-gray">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <FaEyeSlash style={{ color: "#474B57" }} /> 
                  ) : (
                    <FaEye style={{ color: "#474B57" }} /> 
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-custom-gray mt-2">
                By creating an account you agree with our Terms of Service, Privacy Policy.
              </p>
            </div>

            <button
  type="submit"
  className="w-full bg-custom-button text-white py-2 rounded-md hover:scale-105 transition-transform duration-200 text-sm font-medium mt-4 cursor-pointer"
>
  Create account
</button>
          </form>

          <p className="mt-4 text-center text-sm text-custom">
            Already have an account?{" "}
            <a href="/login" className="text-custom font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      <div className="mt-30">
        <Footer />
      </div>
    </>
  );
};

export default SignUp;