import { Link } from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />

      <section className="min-h-screen flex flex-col justify-center items-center bg-[#F6F6F6] px-8 text-center">
        
        <h1 className="text-[72px] font-extrabold text-black mb-4 leading-none">
          404
        </h1>

        <p className="text-[24px] text-gray-800 font-semibold mb-4">
          Ops... seu estilo foi perdido!
        </p>

        <p className="text-[16px] text-gray-600 mb-8 max-w-md">
          A página que você procura não foi encontrada.<br />
          Mas calma! Seu look perfeito ainda tá na nossa coleção.
        </p>

        <Link
          to="/"
          className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition duration-300 text-lg flex items-center"
        >
          Resgatar meu estilo
          <span className="ml-2">→</span>
        </Link>
      </section>
    </>
  );
};

export default NotFound;
