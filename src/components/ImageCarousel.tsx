import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  altText: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
     
      <img
        src={images[currentIndex]}
        alt={altText}
        className="object-contain w-[300px] h-[400px] lg:w-[400px] lg:h-[500px]"
      />

     
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black p-2 hover:scale-110 transition-transform duration-200"
        onClick={goToPrevious}
      >
        <ChevronLeft size={32} strokeWidth={2.5} />
      </button>

      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black p-2 hover:scale-110 transition-transform duration-200"
        onClick={goToNext}
      >
        <ChevronRight size={32} strokeWidth={2.5} />
      </button>

     
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
