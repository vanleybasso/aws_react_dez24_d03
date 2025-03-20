import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../components/ThemeContext"; 

const About = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <Header />

      
      <section className={`${isDarkMode ? "bg-black" : "bg-[#0E1422]"} h-[150px] relative`}>
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
          <img
            src="/src/assets/vanley.jpeg"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white transition-transform duration-300 hover:scale-110"
          />
        </div>
      </section>

      
      <section className={`${isDarkMode ? "bg-black" : "bg-white"} pt-[80px] pb-20 px-10 flex flex-col items-center text-center`}>
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Vanley Basso
        </h1>

        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-lg mb-6`}>
          Hey there <span className="inline-block">👋</span> I'm Vanley Basso! <br />
          Currently working as a Front-end Intern at Compass UOL, using JavaScript, TypeScript, React, Tailwind CSS, and AWS.
        </p>

        
        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} space-y-2`}>
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope className={`${isDarkMode ? "text-gray-300" : "text-gray-800"} w-4 h-4`} />
            <a
              href="mailto:vanley_basso@hotmail.com"
              className="text-blue-600 hover:underline"
            >
              vanley_basso@hotmail.com
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaLinkedin className="text-blue-600 w-4 h-4" />
            <a
              href="https://www.linkedin.com/in/vanleybasso/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/vanleybasso
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaGithub className={`${isDarkMode ? "text-gray-300" : "text-gray-800"} w-4 h-4`} />
            <a
              href="https://github.com/vanleybasso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/vanleybasso
            </a>
          </p>
        </div>

       
        <div className="mt-10">
          <a
            href="#"
            className={`flex items-center ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-800 hover:text-black"} font-medium`}
          >
            <span className="mr-2">🤝</span>
            Connect with me!
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;