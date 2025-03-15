import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AccountDetails: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleOrdersClick = () => {
    navigate('/orders'); 
  };

  const handleAccountDetailsClick = () => {
    window.location.reload(); 
  };

  return (
    <div>
      <Header />

      <h1
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: 'normal' }}
      >
        <span className="inline-block text-primary-heading font-bold">My Account</span>
      </h1>

      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-semibold text-sm text-custom">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className='text-sm font-semibold text-primary-heading'>My Account</span>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-start sm:pl-[174px] mt-[120px] p-4 sm:p-0">
        <div className="flex flex-col w-full md:w-auto">
          <section
            onClick={handleOrdersClick} 
            className="flex items-center p-4 cursor-pointer"
          >
            <img
              src="/src/assets/car.png"
              alt="Orders"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm font-semibold text-custom">Orders</span>
          </section>

          <section
            onClick={handleAccountDetailsClick} 
            className="flex items-center p-4 cursor-pointer"
            style={{ backgroundColor: "#F6F6F6", width: "212px", height: "41px", borderRadius: "8px" }}
          >
            <img
              src="/src/assets/user3.png"
              alt="Account Detail"
              className="w-6 h-6 mr-2"
              style={{ width: "24px", height: "24px" }}
            />
            <span className="text-sm font-semibold">Account Detail</span>
          </section>

          <section
            onClick={handleLogout}
            className="flex items-center p-4 cursor-pointer rounded"
          >
            <img
              src="/src/assets/Logout.png"
              alt="Logout"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm font-semibold text-custom">Logout</span>
          </section>
        </div>

        <div className="border-l border-[#E9E9EB] h-[504px] mx-4 mt-[-40px] hidden md:block" />

        <div className="ml-0 md:ml-8 mt-8 md:mt-[-40px] flex flex-col justify-start w-full md:w-auto">
          <h2 className="text-base font-semibold">Account Details</h2>

          <div
            className="mt-10 flex justify-center items-center"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#F0F1FF',
              borderRadius: '50%',
              overflow: 'hidden', 
            }}
          >
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="User Profile"
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span className="text-lg font-semibold text-gray-700">
                  {user?.firstName ? user.firstName[0] : 'U'}
                </span>
              </div>
            )}
          </div>

          <label className="text-sm font-medium text-custom-gray  mt-8">
            Full Name
          </label>
          <input
            type="text"
            value={user?.fullName || ''}
            readOnly
            className="mt-2 w-[320px] h-[44px] border border-[#E6E7E8] rounded-[6px] px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
          />

          <label className="text-sm font-medium text-custom-gray  mt-6">Email</label>
          <input
            type="email"
            value={user?.primaryEmailAddress?.emailAddress || ''}
            readOnly
            className="mt-2 w-[320px] h-[44px] border border-[#E6E7E8] rounded-[6px] px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
      </section>

      <div className="mt-30">
        <Footer />
      </div>
    </div>
  );
};

export default AccountDetails;