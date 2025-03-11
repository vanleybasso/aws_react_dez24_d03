import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";  

const Orders: React.FC = () => {
  return (
    <div>
      <Header />
      
      
      <h1 
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: 'normal' }}
      >
        <span className="inline-block">My Account</span>
      </h1>

      
      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span>My Account</span>
        </div>
      </section>

     
      <section className="flex flex-col md:flex-row items-start sm:pl-[174px] mt-[120px] p-4 sm:p-0">
        <div className="flex flex-col w-full md:w-auto">
          <section className="flex items-center p-4">
            <img src="/src/assets/car.png" alt="Orders" className="w-6 h-6 mr-2" style={{ width: '24px', height: '24px' }} />
            <span className="text-sm font-semibold">Orders</span>
          </section>

         
          <section className="flex items-center p-4">
            <img src="/src/assets/user.png" alt="Account Detail" className="w-6 h-6 mr-2" style={{ width: '24px', height: '24px' }} />
            <span className="text-sm font-semibold">Account Detail</span>
          </section>

          
          <section className="flex items-center p-4">
            <img src="/src/assets/Logout.png" alt="Logout" className="w-6 h-6 mr-2" style={{ width: '24px', height: '24px' }} />
            <span className="text-sm font-semibold">Logout</span>
          </section>
        </div>

        
        <div className="border-l border-[#E9E9EB] h-[504px] mx-4 mt-[-40px] hidden md:block" />

        
        <div className="ml-0 md:ml-8 mt-8 md:mt-[-40px] flex flex-col justify-start w-full md:w-auto">
          <h2 className="text-lg font-semibold">Orders</h2>
          
         
          <div className="flex flex-col md:flex-row items-start mt-4">
            <div 
              className="flex items-center justify-center" 
              style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#F6F6F6' 
              }}
            >
              <img 
                src="/src/assets/product.png" 
                alt="Imagem"
                style={{ width: '40px', height: '55px' }} 
              />
            </div>

            
            <div className="ml-0 md:ml-4 flex flex-col justify-start mt-4 md:mt-0 gap-y-2">
              <h3 className="text-sm font-semibold" style={{ fontSize: '14px' }}>Raw Black T-Shirt Lineup</h3>
              <p className="text-gray-600" style={{ fontSize: '12px' }}>Ordered on: 27 July 2023</p>
              <p className="text-gray-600" style={{ fontSize: '12px' }}>$70.00</p>
            </div>

            <div
              className="ml-0 md:ml-[223px] flex items-center justify-center border border-[#0E1422] rounded mt-4 md:mt-6" 
              style={{
                width: '100px', 
                height: '40px', 
                borderRadius: '4px', 
              }}
            >
              <span className="text-sm" style={{ color: '#0E1422' }}>View Item</span>
            </div>
          </div>

          
          <div className="border-b border-[#E9E9EB] w-full md:w-[617px] my-8" /> 

          
          <div className="flex flex-col md:flex-row items-start mt-4">
            <div 
              className="flex items-center justify-center" 
              style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#F6F6F6' 
              }}
            >
              <img 
                src="/src/assets/product.png" 
                alt="Imagem"
                style={{ width: '40px', height: '55px' }} 
              />
            </div>

            
            <div className="ml-0 md:ml-4 flex flex-col justify-start mt-4 md:mt-0 gap-y-2">
              <h3 className="text-sm font-semibold" style={{ fontSize: '14px' }}>Raw Black T-Shirt Lineup</h3>
              <p className="text-gray-600" style={{ fontSize: '12px' }}>Ordered on: 27 July 2023</p>
              <p className="text-gray-600" style={{ fontSize: '12px' }}>$70.00</p>
            </div>

            <div
              className="ml-0 md:ml-[223px] flex items-center justify-center border border-[#0E1422] rounded mt-4 md:mt-6" 
              style={{
                width: '100px',
                height: '40px', 
                borderRadius: '4px', 
              }}
            >
              <span className="text-sm" style={{ color: '#0E1422' }}>View Item</span>
            </div>
          </div>
        </div>
      </section>

     
      <div className="mt-30">
        <Footer />
      </div>
    </div>
  );
};

export default Orders;
