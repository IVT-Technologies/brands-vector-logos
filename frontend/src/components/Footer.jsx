
import React from "react";
import { Link } from "react-router-dom";
import { BRAND_NAME, FOOTER_LINKS, SOCIAL_LINKS } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-10 ">
      <div className="mx-auto px-4 md:px-8 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
          {/* Brand */}
          <div className="text-2xl md:text-xl lg:text-2xl font-bold tracking-wide text-[#AFBDE7]">
            {BRAND_NAME}
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-4 mt-4 md:mt-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-[#AFBDE7] text-sm lg:text-lg transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 md:mt-0">
            {SOCIAL_LINKS.map(({ icon: Icon, url }, index) => (
              <Link
                key={index}
                to={url}
                className="hover:text-[#AFBDE7] transition-colors duration-200"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
