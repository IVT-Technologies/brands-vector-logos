import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopDownloadedLogos } from "../apis/Alphabetical_Api";


const DownloadedLogos = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

   const handleClick = (logo) => {
    const slug = logo.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${logo._id}`);
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTopDownloadedLogos();
      setLogos(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="px-3 md:px-8 lg:px-20 py-12 bg-white min-h-screen pt-[calc(3.5rem+1rem)]">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-8">
          Top Downloaded Logos
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-0.8 gap-6 md:gap-8 cursor-pointer">
            {logos.map((logo) => (
              <div
                key={logo._id}
                onClick={() => handleClick(logo)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center justify-between transform hover:-translate-y-1 hover:scale-105 transition-transform duration-200 min-h-[220px] sm:min-h-[240px] md:min-h-[260px]"
              >
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-3 flex items-center justify-center">
                  <img
                    src={logo.pictures?.[0] || "/placeholder.png"}
                    alt={logo.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <p className="text-xs sm:text-sm font-medium text-gray-800 text-center line-clamp-2 min-h-[32px] sm:min-h-[36px] md:min-h-[40px]">
                  {logo.name}
                </p>

                <div className="text-[10px] sm:text-xs text-gray-500">
                  {logo.download_count} downloads
                </div>

                <button className="mt-2 sm:mt-3 px-4 sm:px-6 py-1 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-semibold rounded-full hover:bg-indigo-200 transition-colors">
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadedLogos;
