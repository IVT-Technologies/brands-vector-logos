import React from "react";
import Alphabetical from "./../components/Alphabetical";
import DownloadedLogos from "../components/DownloadedLogos";
import RandomLogos from "../components/RandomLogos";

const Home = () => {
  return (
    <div className="">
      {/* <HeroSection/> */}
      <RandomLogos />
      <DownloadedLogos />
      <Alphabetical />
    </div>
  );
};

export default Home;
