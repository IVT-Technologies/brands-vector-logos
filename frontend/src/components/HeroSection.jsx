// HeroSection.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/logos/a?q=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className="bg-blue-600 text-white px-4 md:px-8 lg:px-30 xl:px-40 h-80">
      <div className="flex flex-col justify-center items-center h-full space-y-4">
        <div className="justify-center items-center text-center space-y-2">
          <h1 className="text-gray-100 text-3xl">Download Product Logos</h1>
          <p className="text-[#AFBDE7] text-xl">of brands you love</p>
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
            className="bg-[#1DAE5B] px-4 flex items-center justify-center rounded-r-md text-white text-sm cursor-pointer"
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
