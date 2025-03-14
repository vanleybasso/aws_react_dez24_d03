import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSuccess("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setError("We couldn't subscribe your email at this moment. Please try again later.");
    }
  };

  return (
    <footer>
      
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
          
          <div className="md:w-1/2 md:pl-[40px]">
            <h2 className="text-xl font-bold mb-2 md:mb-4 text-primary-heading">Join Our Newsletter</h2>
            <p className=" mb-4 md:mb-6 text-custom text-sm">
              We love to surprise our subscribers with occasional gifts.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-2 md:w-1/2">
            <div className="w-full flex justify-center gap-2">
              <input
                type="text"
                placeholder="Your email address"
                aria-invalid={!!error}
                className={`px-4 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:border-black w-2/3`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-custom-button text-white rounded-lg hover:bg-gray-800 tex-sm"
              >
                Subscribe
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          </form>

        </div>
      </div>

     
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:pl-[50px]">

         
          <div>
            <div className="flex items-center">
              <img src="/src/assets/Logomark.png" alt="Logo" className="h-8 mr-2" />
              <span className="text-lg font-semibold">Ecommerce</span>
            </div>
            <p className="text-custom  mt-2 text-sm">
              DevCut is a YouTube channel for <br /> practical project-based learning.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/github.png" alt="GitHub" className="h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/instagram.png" alt="Instagram" className="h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/youtube.png" alt="YouTube" className="h-6" />
              </a>
            </div>
          </div>

         
          <div className="grid grid-cols-3 gap-18 mt-6 md:mt-0">
            <div>
              <h3 className="text-lg font-semibold mb-5 text-sm text-shop-now">SUPPORT</h3>
              <ul className="text-custom text-sm space-y-2">
                <li>FAQ</li>
                <li>Terms of use</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div>
  <h3 className="text-lg font-semibold mb-5 text-sm text-shop-now">
    COMPANY
  </h3>
  <ul className="space-y-2">
    <li>
      <Link
        to="/about"
        className="text-sm text-custom hover:text-black transition-colors duration-200"
      >
        About us
      </Link>
    </li>
    <li className="text-sm text-custom">Contact</li>
    <li className="text-sm text-custom">Careers</li>
  </ul>
</div>


            <div>
              <h3 className="text-lg font-semibold mb-5 text-sm text-shop-now">SHOP</h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  <Link
                    to="/account-details"
                    className=" text-sm text-custom hover:text-black transition-colors duration-200"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/checkout"
                    className="text-sm text-custom hover:text-black transition-colors duration-200"
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className=" text-sm text-custom hover:text-black transition-colors duration-200"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>

         
          <div className="mt-6 md:mt-0">
            <h3 className="font-semibold mb-8 text-sm text-shop-now">ACCEPTED PAYMENTS</h3>
            <div className="flex gap-8">
              <img src="/src/assets/Mastercard.png" alt="MasterCard" className="h-6" />
              <img src="/src/assets/Amex.png" alt="Amex" className="h-6" />
              <img src="/src/assets/Visa.png" alt="Visa" className="h-6" />
            </div>
          </div>

        </div>

        
        <div className="text-center text-gray-600 mt-30 mb-0 text-sm text-custom">
          © {currentYear} DevCut. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;