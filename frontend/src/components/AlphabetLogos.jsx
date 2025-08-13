import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { fetchLogos } from "../apis/Alphabetical_Api";
import axios from "axios";
import CustomButton from "./CustomeButton";
import { IoMdArrowBack } from "react-icons/io";

const AlphabetLogos = () => {
  const { alphabet } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || ""; 
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleClick = (logo) => {
    navigate(`/product/${logo._id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getLogos = async () => {
      setLoading(true);
      try {
        let res;
        if (searchQuery.trim()) {
          // call search API
          res = await axios.get(
            `http://localhost:5000/alphabet/search?name=${encodeURIComponent(
              searchQuery
            )}`
          );
          setLogos(res.data.data || []);
        } else {
          // call normal logos API
          const data = await fetchLogos(alphabet, page);
          setLogos(data || []);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
        setLogos([]);
      } finally {
        setLoading(false);
      }
    };
    getLogos();
  }, [searchQuery, alphabet, page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => page > 1 && setPage((prev) => prev - 1);

  return (
    <div className="px-3 md:px-8 lg:px-20 py-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen pt-[calc(3rem+1rem)]">
      <CustomButton
        onClick={handleBack}
        className=" bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 mb-4 hover:to-indigo-800 text-white font-semibold text-lg md:text-xl py-2 md:py-3 px-3 md:px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <IoMdArrowBack className="text-xl " />
        Back
      </CustomButton>
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-8">
          {searchQuery ? (
            `Search results for "${searchQuery}"`
          ) : (
            <>
              Logos starting with{" "}
              <span className="uppercase text-5xl text-indigo-600 font-extrabold animate-pulse">
                {alphabet}
              </span>
            </>
          )}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : logos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No logos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 cursor-pointer">
            {logos.map((logo) => (
              <div
                key={logo._id}
                onClick={() => handleClick(logo)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center transform hover:-translate-y-1 hover:scale-105 transition-transform duration-200"
              >
                <div className="w-22 h-22 md:w-40 md:h-26 mb-4 flex items-center justify-center">
                  <img
                    src={logo.pictures[0]}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 text-center line-clamp-2">
                  {logo.name}
                </p>
                <button className="mt-3 px-6 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full hover:bg-indigo-200 transition-colors">
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {!searchQuery && (
          <div className="flex justify-center items-center space-x-4 mt-10">
            <CustomButton
              onClick={handlePrev}
              disabled={page === 1}
              className={`bg-blue-600 hover:bg-blue-700 text-white w-24 text-sm md:text-lg font-medium py-2 px-2 md:px-4 rounded-lg shadow-sm transition-all duration-200 ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </CustomButton>
            <span>Page: {page}</span>
            <CustomButton
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-lg w-24 font-medium py-2 px-2 md:px-4 rounded-lg shadow-sm transition-all duration-200"
            >
              Next
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlphabetLogos;
