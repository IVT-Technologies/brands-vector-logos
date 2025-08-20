import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import CustomButton from "../components/CustomeButton";
import { parseColor } from "../utils/svgHelper";
import { handleColorChange as handleColorChangeUtil } from "../utils/colorUtils";
import {
  getProductById,
  incrementDownloadCount,
} from "../apis/Alphabetical_Api";
import { loadSVG } from "../utils/svgLoader";
import { downloadSvgFile } from "../utils/downloadSvg";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import HelperText from "./../components/HelperText";
import { IoMdArrowBack } from "react-icons/io";
import { Helmet } from "react-helmet-async";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [isLoading, setIsLoading] = useState(true);
  const [undoStack, setUndoStack] = useState([]);

  const svgContainerRef = useRef(null);
  const svgJsDraw = useRef(null);
  const colorInputRef = useRef(null);
  const navigate = useNavigate();

  const { id, slug } = useParams();

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Load SVG when product is ready
  useEffect(() => {
    if (product?.pictures?.[0] && svgContainerRef.current) {
      loadSVG({
        svgUrl: product.pictures[0],
        svgContainerRef,
        svgJsDraw,
        setCurrentColor,
        setSelectedElement,
        colorInputRef,
      });
    }
  }, [product]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleColorChange = (e) => {
    handleColorChangeUtil(
      e,
      selectedElement,
      svgJsDraw,
      svgContainerRef,
      setCurrentColor,
      () => {},
      setUndoStack
    );
  };

  const handleReset = async () => {
    if (!product?.pictures?.[0]) return;
    await loadSVG({
      svgUrl: product.pictures[0],
      svgContainerRef,
      svgJsDraw,
      setCurrentColor,
      setSelectedElement,
      colorInputRef,
    });
  };

  const handleDownload = async () => {
    if (!svgJsDraw.current) return;
    try {
      await incrementDownloadCount(id);
      downloadSvgFile(
        svgJsDraw.current.node,
        product.name || "logo-customized"
      );
    } catch (err) {
      console.error(" Error during download:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">
            Loading your design...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The requested logo could not be found. Please try another one.
          </p>
        </div>
      </div>
    );
  }

  
  const canonicalUrl = `${window.location.origin}/${slug || product.name.toLowerCase().replace(/\s+/g, "-")}-svg-logo-${product._id}`;

  return (
    <>
      <Helmet>
        <title>{`${product.name} SVG Logo | Free Download | Brands Vector Logos`}</title>
        <meta
          name="description"
          content={`Download the ${product.name} SVG logo in high-quality vector format. Perfect for design, branding, and creative projects.`}
        />
        <meta property="og:title" content={`${product.name} SVG Logo`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:description"
          content={`Free ${product.name} SVG vector logo for your projects.`}
        />
        <meta property="og:image" content={product.pictures?.[0] || ""} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="w-72 md:w-2xl lg:w-4xl xl:w-7xl pt-16 md:pt-20">
          <CustomButton
            onClick={handleBack}
            className=" bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 mb-4 hover:to-indigo-800 text-white font-semibold text-sm md:text-xl py-2 md:py-3 px-2.5 md:px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <IoMdArrowBack className="text-xl " />
            Back
          </CustomButton>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-8 pt-10">
            <h1 className="text-3xl md:text-4xl font-bold pb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
              {product.name}
            </h1>
            <p className="text-gray-500 text-lg mt-3">
              Customize your perfect logo
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 mb-8">
            {/* SVG Preview */}
            <div className="flex justify-center mb-8 lg:mb-0 lg:flex-1">
              <div
                ref={svgContainerRef}
                className="h-80 w-80 md:h-96 md:w-96 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Color Picker */}
            <motion.div
              className="flex flex-col items-center gap-6 mt-4 p-6 bg-white rounded-2xl shadow-lg w-full lg:max-w-sm border border-gray-100"
            >
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-center gap-3 w-full">
                  <label
                    htmlFor="color-picker"
                    className="font-medium text-gray-700 text-lg"
                  >
                    Color Customization
                  </label>
                </div>
                <div className="flex items-center gap-4 w-full justify-between mt-2">
                  <input
                    type="color"
                    id="color-picker"
                    ref={colorInputRef}
                    value={currentColor}
                    onChange={handleColorChange}
                    className="cursor-pointer h-12 w-12 rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-all"
                    style={{
                      backgroundColor: `${currentColor}20`,
                      padding: 0,
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Selected:
                      </span>
                      <span
                        className="text-sm font-mono px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${currentColor}20`,
                          color: currentColor,
                        }}
                      >
                        {parseColor(currentColor)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Click on logo parts to select them
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 flex flex-col gap-4"
              >
                <CustomButton
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-xs md:text-xl py-3 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiDownload className="text-xl" />
                  Reset
                </CustomButton>

                <CustomButton
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-xs md:text-xl py-3 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiDownload className="text-xl" />
                  Download Customized Logo
                </CustomButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Help Section */}
          <HelperText />
        </motion.div>
      </div>
    </>
  );
}

export default ProductDetail;
