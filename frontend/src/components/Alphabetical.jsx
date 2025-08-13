
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogos } from "../apis/Alphabetical_Api";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Alphabetical = () => {
  const [logoGroups, setLogoGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainer = useRef(null);
  const navigate = useNavigate();
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const getLogos = async () => {
      try {
        const data = await fetchLogos();
        setLogoGroups(data || []);
      } catch (error) {
        console.error("Error fetching logos:", error);
      } finally {
        setLoading(false);
      }
    };

    getLogos();
  }, []);

  
  const updateScrollButtons = useCallback(() => {
    if (!scrollContainer.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      updateScrollButtons();
      isScrollingRef.current = false;
    }, 100);
  }, [updateScrollButtons]);

  // scroll event listener
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollButtons();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, updateScrollButtons]);

  const handleAlphabetClick = (alphabet) => {
    navigate(`/logos/${alphabet.toLowerCase()}`);
  };

  // Optimized scroll function with better performance
  const scroll = useCallback((direction) => {
    if (!scrollContainer.current || isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    const container = scrollContainer.current;
    const itemWidth = 200 + 24; // Fixed item width + margin
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    let targetScroll;
    
    if (direction === 'left') {
      targetScroll = Math.max(0, currentScroll - itemWidth);
    } else {
      targetScroll = Math.min(maxScroll, currentScroll + itemWidth);
    }
    
    
    const startTime = performance.now();
    const startScroll = currentScroll;
    const distance = targetScroll - startScroll;
    const duration = 300; 
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newScroll = startScroll + (distance * easeOutCubic);
      
      container.scrollLeft = newScroll;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isScrollingRef.current = false;
        updateScrollButtons();
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, [updateScrollButtons]);

  return (
    <div id="alphabetical-section" className="px-4 md:px-8 lg:px-20 py-10 relative">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#122141]">
          Alphabetical Logos
        </h1>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100 transition-all duration-200 opacity-90 hover:opacity-100"
              aria-label="Scroll left"
            >
              <AiOutlineLeft size={24} />
            </button>
          )}

          {/* Slider Content */}
          <div
            ref={scrollContainer}
            className="flex space-x-6 overflow-x-auto scrollbar-hide mx-0 md:mx-12 p-1 md:p-2"
            style={{ 
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {logoGroups.map((group, index) => (
              <div
                key={group.alphabet}
                onClick={() => handleAlphabetClick(group.alphabet)}
                className="flex-none w-[140px] sm:w-[160px] md:w-[210px] md:h-[220px] rounded-md shadow-sm bg-white overflow-hidden flex flex-col hover:cursor-pointer hover:scale-105 transition duration-200"
                style={{ willChange: 'transform' }}
              >
                <div className="grid grid-cols-2 grid-rows-2 h-40 sm:h-44 md:h-50">
                  {group.logos.slice(0, 4).map((logo) => (
                    <div
                      key={logo._id}
                      className="flex items-center max-h-23 justify-center p-2 border border-gray-100"
                    >
                      <img
                        src={logo.pictures[0]}
                        alt={logo.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                        style={{ willChange: 'auto' }}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center py-2 bg-gray-100 uppercase font-semibold text-[#122141] text-sm md:text-base">
                  {group.alphabet}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100 transition-all duration-200 opacity-90 hover:opacity-100"
              aria-label="Scroll right"
            >
              <AiOutlineRight size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Alphabetical;