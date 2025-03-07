import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 md:pl-[40px]">
            <h2 className="text-xl font-semibold mb-2 md:mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-4 md:mb-6">We love to surprise our subscribers with occasional gifts.</p>
          </div>
          <form className="flex justify-center gap-2 md:w-1/2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black w-2/3"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Subscribe
            </button>
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
            <p className="text-gray-600 mt-2">
              DevCut is a YouTube channel for <br /> practical project-based learning.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img src="/src/assets/github.png" alt="GitHub" className="h-6" />
              <img src="/src/assets/instagram.png" alt="Instagram" className="h-6" />
              <img src="/src/assets/youtube.png" alt="YouTube" className="h-6" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-18 mt-6 md:mt-0">
            <div>
              <h3 className="text-lg font-semibold mb-5">SUPPORT</h3>
              <ul className="text-gray-600 space-y-2">
                <li>FAQ</li>
                <li>Terms of use</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-5">COMPANY</h3>
              <ul className="text-gray-600 space-y-2">
                <li>About us</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-5">SHOP</h3>
              <ul className="text-gray-600 space-y-2">
                <li>My Account</li>
                <li>Checkout</li>
                <li>Cart</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className="text-lg font-semibold mb-8">ACCEPTED PAYMENTS</h3>
            <div className="flex gap-8 pl-4">
              <img src="/src/assets/Mastercard.png" alt="MasterCard" className="h-6" />
              <img src="/src/assets/Amex.png" alt="Amex" className="h-6" />
              <img src="/src/assets/Visa.png" alt="Visa" className="h-6" />
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-30 mb-0">© {currentYear} DevCut. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
