import Header from "../components/Header";
import Footer from "../components/Footer"; 

const Home = () => {
  return (
    <>
      <Header />
      <section className="bg-[#F6F6F6] py-20 px-10 flex flex-col lg:flex-row items-center justify-between relative">
        <div className="max-w-xl lg:ml-[182px] text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">Fresh Arrivals Online</h1>
          <p className="text-gray-600 mb-6">Discover Our Newest Collection Today.</p>
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            View Collection →
          </button>
        </div>
        <div className="relative w-full lg:w-1/3 mt-10 lg:mt-0">
         
          <div className="absolute bottom-[10px] left-[-80px] w-[340px] h-[340px] bg-[url('/src/assets/Ellipse.png')] bg-cover bg-center rounded-full z-0 lg:block hidden"></div>

         
          <img 
            src="/src/assets/star.png" 
            alt="Star" 
            className="absolute top-[10px] left-[-60px] w-[38px] h-[38px] z-10 lg:block hidden"
          />
          
         
          <img 
            src="/src/assets/imagehero.png" 
            alt="New Arrival" 
            className="w-[255px] h-[382px] mx-auto lg:mx-0 relative z-10 lg:block hidden" 
          />
        </div>
      </section>

      
      <section className="px-10 lg:ml-[182px] mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
       
        <div className="flex flex-col items-start">
          <img 
            src="/src/assets/truck.png"
            alt="Free Shipping Icon"
            className="w-6 h-6 mb-4"
          />
          <h2 className="text-base font-bold mb-2">Free Shipping</h2>
          <p className="text-sm text-gray-600 max-w-md">
            Upgrade your style today and get FREE<br />
            shipping on all orders! Don't miss out.
          </p>
        </div>

        
        <div className="flex flex-col items-start">
          <img 
            src="/src/assets/satisfation.png"
            alt="Satisfaction Guarantee Icon"
            className="w-6 h-6 mb-4"
          />
          <h2 className="text-base font-bold mb-2">Satisfaction Guarantee</h2>
          <p className="text-sm text-gray-600 max-w-md">
            Shop confidently with our Satisfaction <br />
            Guarantee: Love it or get a refund.
          </p>
        </div>

        
        <div className="flex flex-col items-start">
          <img 
            src="/src/assets/security.png"
            alt="Secure Payment Icon"
            className="w-6 h-6 mb-4"
          />
          <h2 className="text-base font-bold mb-2">Secure Payment</h2>
          <p className="text-sm text-gray-600 max-w-md">
            Your security is our priority. Your <br />
            payments are secure with us.
          </p>
        </div>
      </section>

      
      <section className="py-20 px-10 text-center mt-16">
        <h2 className="text-[12px] font-bold mb-2">Shop Now</h2>
        <h3 className="text-[24px] font-semibold">Best Selling</h3>
      </section>

      
      <section className="py-10 px-10 flex mt-10 justify-center flex-wrap gap-5">
        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/short.png" alt="Camiseta 1" className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$27.00</p>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/short.png" alt="Camiseta 2" className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$27.00</p>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/short.png" alt="Camiseta 3" className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$27.00</p>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/short.png" alt="Camiseta 4" className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$27.00</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-10 lg:pl-[174px] lg:pr-[213px] flex items-center justify-between bg-gradient-to-r from-[#F2F2F2] to-white">
        <div className="text-left">
          <h2 className="text-[24px] font-bold mb-4">Browse Our Fashion Paradise!</h2>
          <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
            Step into a world of style and explore our diverse collection of <br />
            clothing categories.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 flex items-center">
            Start Browsing
            <span className="ml-2">→</span> 
          </button>
        </div>

       
        <div className="w-[125px] h-[225px] hidden lg:block">
          <img src="/src/assets/category.png" alt="Fashion Paradise" className="w-full h-full object-cover rounded-lg" />
        </div>
      </section>

      <section className="py-10 px-10 flex mt-10 justify-center flex-wrap gap-5">
       
        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/blazer.png" alt="Produto 1" className="max-w-[80%] max-h-[80%] object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$40.00</p>
          </div>
        </div>


        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/blazer.png" alt="Produto 2" className="max-w-[80%] max-h-[80%] object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$35.00</p>
          </div>
        </div>

        
        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/blazer.png" alt="Produto 3" className="max-w-[80%] max-h-[80%] object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$45.00</p>
          </div>
        </div>

        
        <div className="flex flex-col items-start">
          <div className="w-[248px] h-[312px] bg-[#F6F6F6] flex items-center justify-center">
            <img src="/src/assets/blazer.png" alt="Produto 4" className="max-w-[80%] max-h-[80%] object-contain" />
          </div>
          <p className="text-left text-sm mt-2">Classic Monochrome Tees</p>
          <div className="flex items-center mt-1">
            <p className="text-left text-xs w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">In Stock</p>
            <p className="ml-4 text-left text-sm font-semibold">$50.00</p>
          </div>
        </div>
      </section>

      <Footer /> 
    </>
  );
};

export default Home;
