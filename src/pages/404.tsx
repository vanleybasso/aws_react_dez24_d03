import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeContext"; 

const NotFound = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <>
      <Header />

      <section className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? "bg-black" : "bg-[#F6F6F6]"} px-8 text-center`}>
        <h1 className={`text-[72px] font-extrabold ${isDarkMode ? "text-white" : "text-black"} mb-4 leading-none`}>
          404
        </h1>

        <p className={`text-[24px] ${isDarkMode ? "text-gray-300" : "text-gray-800"} font-semibold mb-4`}>
          Ops... seu estilo foi perdido!
        </p>

        <p className={`text-[16px] ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8 max-w-md`}>
          A página que você procura não foi encontrada.<br />
          Mas calma! Seu look perfeito ainda tá na nossa coleção.
        </p>

        <Link
          to="/"
          className={`bg-custom-button text-white py-3 px-8 rounded-md hover:bg-gray-800 transition duration-300 text-lg flex items-center gap-2 hover:scale-105 transition-transform duration-200`}
        >
          Resgatar meu estilo
          <img
            src="/src/assets/Arrow-Right.png" 
            alt="Ícone de estilo"
            className="w-6 h-6"
          />
        </Link>
      </section>
    </>
  );
};

export default NotFound;