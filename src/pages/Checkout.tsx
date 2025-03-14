import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Checkout: React.FC = () => {
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const tax = useSelector((state: RootState) => state.cart.tax);
  const total = subtotal + tax;
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, user } = useUser();

  const [zipCode, setZipCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [zipCodeError, setZipCodeError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  
  const validateForm = () => {
    const isZipCodeValid = zipCode.length === 8 && !zipCodeError;
    const isStreetAddressValid = streetAddress.trim() !== '';
    const isCityValid = city.trim() !== '';
    const isStateValid = state.trim() !== '';
    const isCountryValid = country.trim() !== '';

    setIsFormValid(
      isZipCodeValid &&
      isStreetAddressValid &&
      isCityValid &&
      isStateValid &&
      isCountryValid
    );
  };

  
  useEffect(() => {
    validateForm();
  }, [zipCode, streetAddress, city, state, country, zipCodeError]);

  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login');
    }
  }, [isLoaded, isSignedIn, navigate]);

  
  useEffect(() => {
    if (isLoaded && isSignedIn && cartItems.length === 0) {
      navigate('/listing');
    }
  }, [isLoaded, isSignedIn, cartItems, navigate]);

  
  const fetchAddress = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setStreetAddress(data.logradouro);
          setCity(data.localidade);
          setState(data.uf);
          setCountry('Brasil');
          setZipCodeError('');
        } else {
          setStreetAddress('');
          setCity('');
          setState('');
          setCountry('Brasil');
          setZipCodeError('CEP não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        setZipCodeError('Erro ao consultar CEP. Tente novamente.');
      }
    } else {
      setStreetAddress('');
      setCity('');
      setState('');
      setCountry('Brasil');
      setZipCodeError(cep.length > 0 ? 'CEP incompleto.' : '');
    }
  };

  
  const handleEditCart = () => {
    navigate('/cart');
  };

  
  const handlePlaceOrder = async () => {
    if (!user) return;

    const order = {
      userId: user.id,
      items: cartItems,
      total,
      date: new Date().toISOString(),
      shippingAddress: {
        zipCode,
        streetAddress,
        city,
        state,
        country,
      },
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        navigate('/afterpayment'); 
      } else {
        console.error('Failed to save order');
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  
  if (!isLoaded || !isSignedIn || cartItems.length === 0) {
    return null;
  }

  return (
    <div>
      <Header />

      <h1
        className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 flex items-center relative sm:pl-[174px]"
        style={{ lineHeight: 'normal' }}
      >
        <span className="inline-block  text-primary-heading font-semibold">Checkout</span>
      </h1>

      <section className="flex items-center p-4 pl-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold text-sm text-custom">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className='text-sm text-primary-heading font-semibold'>Checkout</span>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row p-4 sm:pl-[174px] gap-8">
        <div className="flex-1">
          <h2 className="text-left text-lg pl-4 pt-4 sm:pl-0 mt-8 text-base font-semibold">Shipping Address</h2>

          <div className="pl-4 sm:pl-0 mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-[259px]">
              <label htmlFor="zip-code" className="block text-sm font-semibold mb-2 text-custom-gray">
                Zip Code
              </label>
              <input
                id="zip-code"
                type="text"
                value={zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setZipCode(value);
                  fetchAddress(value);
                }}
                className="w-full h-[45px] p-2 border rounded-md"
                style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
                maxLength={8}
              />
              {zipCodeError && <p className="text-red-500 text-sm mt-1">{zipCodeError}</p>}
            </div>

            <div className="w-full sm:w-[259px]">
              <label htmlFor="country" className="block text-sm font-semibold mb-2 text-custom-gray">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-[45px] p-2 border rounded-md"
                style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
              />
            </div>
          </div>

          <div className="pl-4 sm:pl-0 mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-[259px]">
              <label htmlFor="city" className="block text-sm font-semibold mb-2 text-custom-gray">
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-[45px] p-2 border rounded-md"
                style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
              />
            </div>

            <div className="w-full sm:w-[259px]">
              <label htmlFor="state" className="block text-sm font-semibold mb-2 text-custom-gray">
                State
              </label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-[45px] p-2 border rounded-md"
                style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
              />
            </div>
          </div>

          <div className="pl-4 sm:pl-0 mt-8">
            <label htmlFor="street-address" className="block text-sm font-semibold mb-2 text-custom-gray">
              Street Address
            </label>
            <input
              id="street-address"
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full lg:w-[534px] h-[45px] p-2 border rounded-md"
              style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
            />
          </div>

          <div className="pl-4 sm:pl-0 mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-[259px]">
              <label htmlFor="full-name" className="block text-sm font-semibold mb-2 text-custom-gray">
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                value={user?.fullName || ''}
                readOnly
                className="w-full h-[45px] p-2 border rounded-md bg-gray-100 cursor-default"
                style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
              />
            </div>

            <div className="w-full sm:w-[259px]">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-custom-gray">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.primaryEmailAddress?.emailAddress || ''}
                readOnly
                className="w-full h-[45px] p-2 border rounded-md bg-gray-100 cursor-default"
                style={{ fontSize: '14px', borderColor: '#E6E7E8' }}
              />
            </div>
          </div>
        </div>

        <div
          className="hidden lg:block"
          style={{
            width: '1px',
            height: '504px',
            backgroundColor: '#E6E7E8',
            marginLeft: '32px',
            marginTop: '32px',
          }}
        ></div>

        <div className="w-full lg:w-1/3 p-6 h-fit lg:mr-[174px] mt-8">
          <h2 className="text-base font-semibold mb-10">Your Order</h2>

          <div className="w-full flex justify-end mb-16">
            <div
              className="border border-[#B6B7BC] rounded-[4px] flex items-center justify-center w-[107px] h-[44px] cursor-pointer"
              onClick={handleEditCart}
            >
              <span className="text-sm text-[#5C5F6A]" style={{ fontSize: '14px' }}>
                Edit Cart
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className='text-primary-heading font-semibold'>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className='text-primary-heading font-semibold'>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className='text-primary-heading font-semibold'>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-t-[#E6E7E8] pt-4 mb-6 flex justify-between font-medium text-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!isFormValid}
            className={`w-full bg-black text-white py-3 rounded mt-6 ${
              isFormValid ? 'hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'
            } transition cursor-pointer`}
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;