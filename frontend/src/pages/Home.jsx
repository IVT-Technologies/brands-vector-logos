import React from "react";
import Alphabetical from "./../components/Alphabetical";
import DownloadedLogos from "../components/DownloadedLogos";
import RandomLogos from "../components/RandomLogos";
import { Helmet } from "react-helmet-async";
import { BASE_URL } from "../constants";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Brands Vector Logos | Download Free SVG Logos</title>
        <meta
          name="description"
          content="Browse, Customize and download free vector logos of popular brands in SVG format. Perfect for designers, marketers, and creative projects."
        />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta
          property="og:title"
          content="Brands Vector Logos - Free SVG Logo Downloads"
        />
        <meta
          property="og:description"
          content="Explore a vast collection of brand vector logos in SVG format. Download instantly for free."
        />
      </Helmet>
      <div className="">
        <RandomLogos />
        <DownloadedLogos />
        <Alphabetical />
      </div>
    </>
  );
};

export default Home;
