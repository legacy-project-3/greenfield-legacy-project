import { carousel } from "@material-tailwind/react";
import React from "react";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slides = [
    { image: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.og.jpg?202405161715', title: 'iPhone 14 Series', description: 'Up to 10% off Voucher' },
    { image: 'https://s.isanook.com/hi/0/ui/303/1516981/gal-1516981-20201125110042-476d797.jpg', title: 'MacBook Pro', description: 'Supercharged for pros' },
    { image: 'https://iphonewired.com/wp-content/uploads/2022/10/221004-51100-1.png', title: 'AirPods Pro', description: 'Magic like youve never heard' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-black text-white  overflow-hidden mb-8">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <img src="https://cdn.wallpapersafari.com/85/37/g2SpCY.jpg" alt='Apple entertainment' className="w-8 h-8 mb-2" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2">{slide.title}</h2>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.description}</h1>
                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">Shop Now</button>
              </div>
              <img src={slide.image} alt={slide.title} className="w-full md:w-1/2 object-cover" />
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full">
        <FaChevronLeft />
      </button>
      <button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full">
        <FaChevronRight />
      </button>
    </section>
  );
};

export default Carousel