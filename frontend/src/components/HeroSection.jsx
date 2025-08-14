import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg4.jpg";

const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/logos/a?q=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div
      className="bg-blue-600 text-white px-4 md:px-8 lg:px-30 xl:px-40 h-[500px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center items-center h-full space-y-4">
        <div className="justify-center items-center text-center space-y-3">
          <h1 className="text-[#142352] text-4xl font-extrabold tracking-wide">
            Download Brands Logos
          </h1>
          <p className="text-[#142352] text-lg md:text-xl italic">
            Of the brands you love – in high-quality SVG format
          </p>
          <p className="text-[#5e5daf] max-w-2xl mx-auto text-sm md:text-base">
            Explore a curated collection of brand logos ready to download for
            free. Perfect for designers, marketers, and creative projects.
            Customize colors, resize without losing quality, and make them your
            own.
          </p>
        </div>

        <div className="flex w-fit">
          <input
            type="search"
            placeholder="For Example: Adidas, Tesla, Facebook"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-white text-gray-600 px-4 py-3 rounded-l-md w-60 md:w-96 outline-none"
          />
          <span
            className="bg-[#142352] px-4 flex items-center justify-center rounded-r-md text-white text-sm cursor-pointer"
            onClick={handleSearch}
          >
            <FaSearch />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
