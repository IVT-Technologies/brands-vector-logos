import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';


const Layout = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const hideHeroSectionOn = ['/product','/about','contact','/privacy-policy','/terms-and-conditions'];

  const shouldShowHero = !hideHeroSectionOn.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Navbar />
      {shouldShowHero && <HeroSection onSearch={setSearchQuery} />}
      <main>
        
        <Outlet context={{ searchQuery }} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
