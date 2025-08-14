import React from "react";
import { Link } from "react-router-dom";
import {
  ABOUT_TITLE,
  ABOUT_DESC,
  FEATURES,
  WHY_CHOOSE_US,
  CTA_TITLE,
  CTA_DESC,
  CTA_BTN,
  BASE_URL,
} from "../constants";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
     <>
      <Helmet>
        <title>About Us | Brands Vector Logos</title>
        <meta
          name="description"
          content="Learn more about Brands Vector Logos, your go-to source for high-quality, free SVG brand logos for designers and creative projects."
        />
        <link rel="canonical" href={`${BASE_URL}/about`} />
        <meta
          property="og:title"
          content="About Brands Vector Logos"
        />
        <meta
          property="og:description"
          content="Discover the story behind Brands Vector Logos and our mission to provide free, high-quality SVG brand logos for everyone."
        />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-6 py-12 mt-10 md:mt-16 text-gray-800">
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">{ABOUT_TITLE}</h1>
        <p className="text-lg leading-relaxed text-gray-600">{ABOUT_DESC}</p>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">
              {icon} {title}
            </h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          Why Choose Our Platform?
        </h2>
        <ul className="flex flex-col items-center gap-4 text-lg text-gray-600">
          {WHY_CHOOSE_US.map((point, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {CTA_TITLE}
        </h2>
        <p className="text-gray-600 mb-6">{CTA_DESC}</p>
        <Link
          to={"/"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          {CTA_BTN}
        </Link>
      </section>
    </div>
    </>
  );
};

export default About;
