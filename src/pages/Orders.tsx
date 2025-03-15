import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser, useAuth } from "@clerk/clerk-react"; 

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
  const { signOut } = useAuth(); 
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost:3001/orders?userId=${user.id}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  
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

  return (
    <div>
      <Header />

      <h1
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: "normal" }}
      >
        <span className="inline-block text-primary-heading font-semibold">My Account</span>
      </h1>

      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold text-sm text-custom">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className="text-sm font-semibold">My Account</span>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-start sm:pl-[174px] mt-[120px] p-4 sm:p-0">
        
        <div className="flex flex-col w-full md:w-auto">
          
          <section
            className="flex items-center p-4 cursor-pointer"
            style={{ backgroundColor: "#F6F6F6", width: "212px", height: "41px", borderRadius: "8px" }}
            onClick={handleOrdersClick}
          >
            <img src="/src/assets/car.png" alt="Orders" className="w-6 h-6 mr-2" style={{ width: "24px", height: "24px" }} />
            <span className="text-sm font-semibold text-primary-heading">Orders</span>
          </section>

          
          <section
            className="flex items-center p-4 cursor-pointer"
            onClick={handleAccountDetailsClick}
          >
            <img src="/src/assets/user.png" alt="Account Detail" className="w-6 h-6 mr-2" style={{ width: "24px", height: "24px" }} />
            <span className="text-sm font-semibold text-custom">Account Detail</span>
          </section>

         
          <section
            className="flex items-center p-4 -mt-2 cursor-pointer rounded"
            onClick={handleLogout}
          >
            <img src="/src/assets/Logout.png" alt="Logout" className="w-6 h-6 mr-2" style={{ width: "24px", height: "24px" }} />
            <span className="text-sm font-semibold text-custom">Logout</span>
          </section>
        </div>

       
        <div className="border-l border-[#E9E9EB] h-[504px] mx-4 mt-[-40px] hidden md:block" />

        <div className="ml-0 md:ml-8 mt-8 md:mt-[-40px] flex flex-col justify-start w-full md:w-auto">
  <h2 className="text-base font-semibold">Orders</h2>

 
  <div style={{ marginTop: "20px" }}>
    {orders.length === 0 ? (
      <p className="text-gray-600 mt-4">No orders found.</p>
    ) : (
      orders.map((order, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col md:flex-row items-start justify-between mt-4 mb-6 w-full">
            
            <div className="flex flex-col md:flex-row items-start flex-grow">
             
              <div
                className="flex items-center justify-center"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#F6F6F6",
                }}
              >
                <img
                  src={order.items[0]?.imageUrl || "/src/assets/product.png"}
                  alt="Product"
                  style={{ width: "40px", height: "55px" }}
                />
              </div>

            
              <div className="ml-0 md:ml-4 flex flex-col justify-start mt-4 md:mt-0 gap-y-2 flex-grow">
                <h3 className="text-sm font-semibold text-primary-heading" style={{ fontSize: "14px" }}>
                  {order.items[0]?.title || "Product Title"}
                </h3>
                <p className="text-custom" style={{ fontSize: "12px" }}>
                  Ordered on: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-primary-heading" style={{ fontSize: "12px" }}>
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            </div>

           
            <div
              className="flex items-center justify-center border border-[#0E1422] rounded mt-4 md:mt-0 md:ml-40 ml-0 w-full md:w-auto flex-shrink-0" // Ajustes responsivos
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "4px",
              }}
            >
              <span className="text-sm" style={{ color: "#0E1422" }}>
                View Item
              </span>
            </div>
          </div>

          
          {index < orders.length - 1 && ( 
            <hr style={{ border: "1px solid #E9E9EB", margin: "16px 0" }} />
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