import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
       
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
         
          <div className="text-2xl font-bold tracking-wide text-[#AFBDE7]">
            Brands Vector Logos
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <li>
              <Link
                to="/about"
                className="hover:text-[#AFBDE7] transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#AFBDE7] transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-[#AFBDE7] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="hover:text-[#AFBDE7] transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <Link to={"#"} className="hover:text-[#AFBDE7] transition-colors duration-200">
              <FaFacebookF />
            </Link>
            <Link to={"#"} className="hover:text-[#AFBDE7] transition-colors duration-200">
              <FaTwitter />
            </Link>
            <Link to={"#"}className="hover:text-[#AFBDE7] transition-colors duration-200">
              <FaInstagram />
            </Link>
            <Link to={"#"} className="hover:text-[#AFBDE7] transition-colors duration-200">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved. 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
