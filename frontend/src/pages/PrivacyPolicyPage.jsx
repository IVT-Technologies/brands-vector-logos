import React from "react";
import { PRIVACY_CONTENT } from "../constants";
import {  useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import CustomButton from "../components/CustomeButton";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-16 pt-24 text-gray-800">
      <div className="w-72 md:w-3xl ">
        <CustomButton
        onClick={handleBack}
        className=" bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 mb-4 hover:to-indigo-800 text-white font-semibold text-sm md:text-xl py-2 md:py-3 px-2.5 md:px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <IoMdArrowBack className="text-xl " />
        Back
      </CustomButton>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">Privacy Policy</h1>

      <p className="text-lg text-gray-600 mb-6">
        We are committed to protecting your privacy. This policy outlines how
        we collect, use, and protect your personal and application data while
        you use our Email API service.
      </p>

      {PRIVACY_CONTENT.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-2">
            {section.title}
          </h2>
          <p className="text-gray-600">{section.text}</p>
        </div>
      ))}
    </div>
  );
}
