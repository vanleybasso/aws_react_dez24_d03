import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useTheme } from "../components/ThemeContext"; 

interface Order {
  userId: string;
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
    imageUrl: string;
  }[];
  total: number;
  date: string;
  shippingAddress: {
    zipCode: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
  };
}

const Orders: React.FC = () => {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth(); 
  const { signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  useEffect(() => {
    
    if (isLoaded && !isSignedIn) {
      navigate("/login"); 
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost:3001/orders?userId=${user.id}`);
        const data = await response.json();

        const sortedOrders = data.sort((a: Order, b: Order) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user, isLoaded, isSignedIn, navigate]); 

  const handleAccountDetailsClick = () => {
    navigate("/account-details");
  };

  const handleOrdersClick = () => {
    window.location.reload();
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleViewItemClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-700"}`}>
      <Header />

      <h1
        className={`text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px] ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
        style={{ lineHeight: "normal" }}
      >
        <span className={`inline-block font-bold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
          My Account
        </span>
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
            My Account
          </span>
        </div>
      </section>

      <section className={`flex flex-col md:flex-row items-start sm:pl-[174px] mt-[120px] p-4 sm:p-0 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}>
        <div className="flex flex-col w-full md:w-auto">
        <section
    className={`flex items-center p-4 cursor-pointer hover:scale-105 transition-transform duration-200 ${
      isDarkMode ? "bg-gray-700" : "bg-[#F6F6F6]"
    }`}
    style={{ width: "212px", height: "41px", borderRadius: "8px" }}
    onClick={handleOrdersClick}
  >
    <img
      src="/src/assets/car.png"
      alt="Orders"
      className={`w-6 h-6 mr-2 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
      style={{ width: "24px", height: "24px" }}
    />
    <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
      Orders
    </span>
  </section>

  <section
    className="flex items-center p-4 cursor-pointer hover:scale-105 transition-transform duration-200"
    onClick={handleAccountDetailsClick}
  >
    <img
      src="/src/assets/user.png"
      alt="Account Detail"
      className={`w-6 h-6 mr-2 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
      style={{ width: "24px", height: "24px" }}
    />
    <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
      Account Detail
    </span>
  </section>

  <section
    className="flex items-center p-4 -mt-2 cursor-pointer rounded hover:scale-105 transition-transform duration-200"
    onClick={handleLogout}
  >
    <img
      src="/src/assets/Logout.png"
      alt="Logout"
      className={`w-6 h-6 mr-2 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
      style={{ width: "24px", height: "24px" }}
    />
    <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-custom"}`}>
      Logout
    </span>
  </section>
</div>

        <div className={`border-l ${isDarkMode ? "border-gray-700" : "border-[#E9E9EB]"} h-[504px] mx-4 mt-[-40px] hidden md:block`} />

        <div className="ml-0 md:ml-8 mt-8 md:mt-[-40px] flex flex-col justify-start w-full md:w-auto">
          {orders.length > 0 && (
            <h2 className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
              Orders
            </h2>
          )}

          <div style={{ marginTop: "20px" }}>
            {orders.length === 0 ? (
             <div className="flex justify-center items-center flex-col mt-12 sm:mt-16 md:ml-[200px]">
             <img
               src="/src/assets/Empty.png"
               alt="No Orders"
               className={`w-16 h-16 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
             />
             <p className={`text-sm sm:text-base mt-4 text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
               Your order history is waiting to be filled.
             </p>
             <button
               onClick={() => navigate("/listing")}
               className={`bg-custom-button text-white py-2 px-6 rounded-md hover:bg-gray-800 cursor-pointer flex items-center gap-2 mt-4 hover:scale-105 transition-transform duration-200 ${
                 isDarkMode ? "bg-gray-700" : "bg-custom-button"
               }`}
             >
               Start Shopping
               <img
                 src="/src/assets/Arrow-Right.png"
                 alt="Ícone"
                 className="w-6 h-6"
               />
             </button>
           </div>
            ) : (
              orders.map((order, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col md:flex-row items-start justify-between mt-4 mb-6 w-full">
                    <div className="flex flex-col md:flex-row items-start flex-grow">
                      <div
                        className={`flex items-center justify-center ${
                          isDarkMode ? "bg-gray-700" : "bg-[#F6F6F6]"
                        }`}
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                      >
                        <img
                          src={order.items[0]?.imageUrl || "/src/assets/product.png"}
                          alt="Product"
                          style={{ width: "50px", height: "55px" }}
                        />
                      </div>

                      <div className="ml-0 md:ml-4 flex flex-col justify-start mt-4 md:mt-0 gap-y-2 flex-grow">
                        <h3 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`} style={{ fontSize: "14px" }}>
                          {order.items[0]?.title || "Product Title"}
                        </h3>
                        <p className={`${isDarkMode ? "text-gray-300" : "text-custom"}`} style={{ fontSize: "12px" }}>
                          Ordered on: {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className={`${isDarkMode ? "text-white" : "text-primary-heading"}`} style={{ fontSize: "12px" }}>
                          Total: ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-center border ${
                        isDarkMode ? "border-gray-300" : "border-[#0E1422]"
                      } rounded mt-4 md:mt-0 md:ml-40 ml-0 w-full md:w-auto flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200`}
                      style={{
                        width: "100px",
                        height: "40px",
                        borderRadius: "4px",
                      }}
                      onClick={() => handleViewItemClick(order.items[0]?.id)}
                    >
                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#0E1422]"}`}>
                        View Item
                      </span>
                    </div>
                  </div>

                  {index < orders.length - 1 && (
                    <hr className={`${isDarkMode ? "border-gray-700" : "border-[#E9E9EB]"}`} style={{ margin: "16px 0" }} />
                  )}
                </React.Fragment>
              ))
            )}
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