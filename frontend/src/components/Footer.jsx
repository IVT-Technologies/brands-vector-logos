import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='py-8 border-t border-gray-200'>
      <div className='flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-20'>
        {/* Left Side*/}
        <ul className='flex flex-col md:flex-row md:space-x-4 space-y-2 justify-center items-center md:space-y-0 text-gray-600 mb-4 md:mb-0'>
          <li><Link to={'/about'} className='hover:text-blue-500 transition-colors duration-200'>About</Link></li>
          <li><Link to={'/contact'} className='hover:text-blue-500 transition-colors duration-200'>Contact</Link></li>
          <li><Link to={'/privacy-policy'} className='hover:text-blue-500 transition-colors duration-200'>Privacy Policy</Link></li>
          <li><Link to={'/terms-and-conditions'} className='hover:text-blue-500 transition-colors duration-200'>Terms of Service</Link></li>
        </ul>

        {/* Right Side */}
        <div className='text-gray-600 text-sm'>
          &copy; {new Date().getFullYear()}  Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;