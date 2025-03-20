import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import { useTheme } from "../components/ThemeContext"; 

interface Product {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  price: string;
  status: string;
  rating?: number;
  reviewsCount: number;
  colors: string[];
  sizes: string[];
  description: string;
  images: string[];
}

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        document.title = `Hype - ${data.title}`;
        if (data.colors.length === 1) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes.length === 1) {
          setSelectedSize(data.sizes[0]);
        }

        fetch("http://localhost:3001/products")
          .then((response) => response.json())
          .then((allProducts) => {
            const filteredProducts = allProducts.filter(
              (p: Product) => p.id !== data.id
            );
            setRelatedProducts(filteredProducts.slice(0, 4));
          })
          .catch((error) =>
            console.error("Erro ao buscar produtos relacionados:", error)
          );
      })
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setError("Please select a color and size.");
      return;
    }
    setError(null);

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      selectedColor,
      selectedSize,
      quantity,
    };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  return (
    <div className={`${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-700"}`}>
      <Header />

      
      <section className="flex items-center p-4 pl-4 xl:pl-32">
        <span className={`mr-2 text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-custom"}`}>Ecommerce</span>
        <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
        <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>
          {product.title}
        </span>
      </section>

      
      <div className="flex flex-col lg:flex-row ml-8 xl:ml-32 mt-4 space-y-4 lg:space-y-0 lg:space-x-8">
       
        <div className={`flex justify-center items-center relative w-full lg:w-[534px] lg:h-[574px] p-4 ${isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"}`}>
          <ImageCarousel images={product.images} altText={product.altText} />
        </div>

        
        <div className="flex flex-col justify-start">
          <div className="flex items-center justify-between w-full">
            <h2 className={`text-[24px] font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{product.title}</h2>
            <img
              src="/src/assets/Share.png"
              alt="Compartilhar"
              className="w-6 h-6 cursor-pointer ml-30"
            />
          </div>

          
          <div className="flex items-center space-x-4 mt-2">
            <div
              className={`flex items-center px-3 ${isDarkMode ? "bg-gray-700" : "bg-[#F6F6F6]"}`}
              style={{
                width: "167px",
                height: "28px",
                borderRadius: "100px",
              }}
            >
              <img
                src="/src/assets/star.png"
                alt="Star"
                className="w-4 h-[15px] mr-2"
              />
              <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {product.rating || 4.2} — {product.reviewsCount} Reviews
              </span>
            </div>

            <div className={`w-[89px] h-[28px] border rounded-full flex items-center justify-center ${isDarkMode ? "border-gray-600" : "border-gray-400"}`}>
              <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{product.status}</p>
            </div>
          </div>

          
          <div className="mt-4">
            <p className={`text-[18px] font-medium font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              ${parseFloat(product.price).toFixed(2)}
            </p>
          </div>

          
          {product.status === "IN STOCK" && (
            <>
              <div className="mt-6">
                <p className={`text-[12px] font-semibold ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
                  AVAILABLE COLORS
                </p>
              </div>

              <div className="flex space-x-3 mt-2">
  {product.colors.map((color, index) => (
    <div
      key={index}
      className="w-6 h-6 rounded-full cursor-pointer border-2"
      style={{
        backgroundColor: color,
        border:
          selectedColor === color
            ? isDarkMode
              ? "3px solid white" 
              : "2px solid black" 
            : isDarkMode
            ? "2px solid #4B5563" 
            : "2px solid #E6E7E8", 
        boxShadow:
          selectedColor === color && isDarkMode
            ? "0 0 8px rgba(255, 255, 255, 0.8)" 
            : "none", 
      }}
      onClick={() => setSelectedColor(color)}
    ></div>
  ))}
</div>

              
              <div className="mt-6">
                <p className={`text-[12px] font-semibold ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
                  SELECT SIZE
                </p>
              </div>

              <div className="flex space-x-3 mt-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-[4px] border-2 ${
                      selectedSize === size
                        ? isDarkMode
                          ? "border-white" 
                          : "border-black" 
                        : isDarkMode
                        ? "border-gray-600" 
                        : "border-[#E6E7E8]" 
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span className={`text-[12px] ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
                      {size}
                    </span>
                  </div>
                ))}
              </div>

              
              <div className="mt-8">
                <p className={`text-[12px] font-semibold ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
                  QUANTITY
                </p>
              </div>

              <div className="mt-2">
                <div className={`w-[164px] h-[44px] border flex items-center justify-between px-4 rounded ${
                  isDarkMode ? "border-gray-600" : "border-[#E6E7E8]"
                }`}>
                  <img
                    src="/src/assets/Minus.png"
                    alt="Minus"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleQuantityChange("decrease")}
                  />
                  <span className={`text-[14px] ${isDarkMode ? "text-white" : "text-gray-700"}`}>{quantity}</span>
                  <img
                    src="/src/assets/Add.png"
                    alt="Plus"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleQuantityChange("increase")}
                  />
                </div>
              </div>

              
              <div className="mt-10">
                <button
                  className="w-[284px] h-[44px] bg-[#0E1422] text-white text-[14px] rounded cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>

              
              {error && (
                <div className="mt-2">
                  <p className="text-[12px] text-red-500">{error}</p>
                </div>
              )}

              
              <div className="mt-2">
                <p className={`text-[12px] ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
                  — Free shipping on orders $100+
                </p>
              </div>
            </>
          )}
        </div>
      </div>

     
<div className="flex flex-col lg:flex-row ml-8 xl:ml-32 mt-[100px]">
  <div className={`rounded-[8px] w-[241px] h-[41px] flex items-center px-3 ${
    isDarkMode ? "bg-gray-800" : "bg-[#F6F6F6]"
  }`}>
    <img
      src="/src/assets/More.png"
      alt="Ícone"
      className={`w-6 h-6 mr-2 ${isDarkMode ? "details-icon" : ""}`} 
    />
    <span className={`text-[14px] ${isDarkMode ? "text-white" : "text-gray-700"}`}>Details</span>
  </div>

  <div className="mt-[16px] lg:mt-0 lg:ml-8 max-w-[727px]">
    <h2 className={`text-[16px] font-bold ${isDarkMode ? "text-white" : "text-primary-heading"}`}>Detail</h2>
    <p className={`text-[14px] mt-2 ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
      {product.description}
    </p>
  </div>
</div>

      
      <div className="flex flex-col ml-8 xl:ml-32 mt-[300px]">
        <h2 className={`text-[24px] font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>You might also like</h2>
        <p className={`text-[12px] ${isDarkMode ? "text-gray-300" : "text-[#5C5F6A]"}`}>
          SIMILAR PRODUCTS
        </p>

        <div className="py-10 flex mt-10 justify-start flex-wrap gap-5">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              altText={product.altText}
              title={product.title}
              price={parseFloat(product.price)}
              status={product.status}
            />
          ))}
        </div>
      </div>

      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Product;