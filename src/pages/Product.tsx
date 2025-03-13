import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";

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

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
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
      setError("Por favor, selecione uma cor e um tamanho.");
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
    <div>
      <Header />

      <section className="flex items-center p-4 pl-4 xl:pl-32">
        <span className="mr-2 font-bold">Ecommerce</span>
        <img
          src="/src/assets/arrow.png"
          alt=">"
          className="w-2 h-2 mr-2"
        />
        <span>{product.title}</span>
      </section>

      <div className="flex flex-col lg:flex-row ml-8 xl:ml-32 mt-4 space-y-4 lg:space-y-0 lg:space-x-8">
        <div className="bg-[#F6F6F6] flex justify-center items-center relative w-full lg:w-[534px] lg:h-[574px] p-4">
          <ImageCarousel images={product.images} altText={product.altText} />
        </div>

        <div className="flex flex-col justify-start">
          <div className="flex items-center space-x-8">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <img
              src="/src/assets/Share.png"
              alt="Compartilhar"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <div
              className="bg-[#F6F6F6] flex items-center px-3"
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
              <span className="text-xs text-gray-700">
                {product.rating || 4.2} — {product.reviewsCount} Reviews
              </span>
            </div>

            <div className="w-[89px] h-[28px] border border-gray-400 rounded-full flex items-center justify-center">
              <p className="text-xs text-gray-700">{product.status}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[18px] text-gray-800 font-medium">
              ${parseFloat(product.price).toFixed(2)} 
            </p>
          </div>

          {product.status === "In Stock" && (
            <>
              <div className="mt-4">
                <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
                  Available Colors
                </p>
              </div>

              <div className="flex space-x-3 mt-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
                    style={{
                      backgroundColor: color,
                      border:
                        selectedColor === color
                          ? "2px solid #000"
                          : "1px solid #E6E7E8",
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
                  Select Size
                </p>
              </div>

              <div className="flex space-x-3 mt-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`w-[40px] h-[40px] border ${
                      selectedSize === size
                        ? "border-black"
                        : "border-[#E6E7E8]"
                    } flex items-center justify-center cursor-pointer`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span className="text-[14px]" style={{ color: "#5C5F6A" }}>
                      {size}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
                  Quantity
                </p>
              </div>

              <div className="mt-2">
                <div className="w-[164px] h-[44px] border border-[#E6E7E8] flex items-center justify-between px-4">
                  <img
                    src="/src/assets/Minus.png"
                    alt="Minus"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleQuantityChange("decrease")}
                  />
                  <span className="text-[14px]">{quantity}</span>
                  <img
                    src="/src/assets/Add.png"
                    alt="Plus"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleQuantityChange("increase")}
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="w-[284px] h-[44px] bg-[#0E1422] text-white text-[14px]"
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
                <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
                  — Free shipping on orders $100+
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row ml-8 xl:ml-32 mt-[248px]">
        <div className="bg-[#F6F6F6] rounded-[8px] w-[241px] h-[41px] flex items-center px-3">
          <span className="text-[14px]">Details</span>
        </div>

        <div className="mt-[16px] lg:mt-0 lg:ml-8 max-w-[727px]">
          <h2 className="text-[16px] font-bold">Detail</h2>
          <p className="text-[14px] mt-2" style={{ color: "#5C5F6A" }}>
            {product.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col ml-8 xl:ml-32 mt-[300px]">
        <h2 className="text-[24px] font-bold">You might also like</h2>
        <p className="text-[12px]" style={{ color: "#5C5F6A" }}>
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
              price={product.price}
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