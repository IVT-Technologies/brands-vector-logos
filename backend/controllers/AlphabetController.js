const {
  STATUS,
  MESSAGES,
  SUCCESS,
  FAILURE,
} = require("../constants/responseMessages");
const Alphabet = require("../models/Alphabet");
const axios = require("axios");

const { fetchLogosByAlphabet, fetchSingleLogo,  proxySVGDownloadService, incrementDownloadService, getTopDownloadsService,searchAlphabets, getRandomLogosService  } = require("../services/alphabetService");

exports.getAllByAlphabets = async (req, res) => {
  try {
    const { alphabet, page = 1 } = req.query;

    const result = await fetchLogosByAlphabet(alphabet, Number(page));

    res.status(STATUS.OK).json({
      status: SUCCESS,
      ...result,
    });
  } catch (error) {
    console.error("Error fetching SVG logos:", error);
    res.status(STATUS.SERVER_ERROR).json({
      status: FAILURE,
      message: MESSAGES.INTERNAL_ERROR,
    });
  }
};


exports.getSingleProduct=async(req,res)=>{

  try{
    const {id}=req.params;
    const result = await fetchSingleLogo(id);
    res.status(STATUS.OK).json({
      status: SUCCESS,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(STATUS.SERVER_ERROR).json({
      status: FAILURE,
      message: MESSAGES.INTERNAL_ERROR,
    });
  }
}

exports.proxySVGDownload = async (req, res) => {
  try {
    const url = decodeURIComponent(req.query.url);
    // console.log("🔄 Proxy request for URL:", url);

    const svgData = await proxySVGDownloadService(url);

    res.set({
      "Content-Type": "image/svg+xml",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    res.send(svgData);
  } catch (error) {
    console.error(" Proxy error:", error.message);
    res.status(STATUS.SERVER_ERROR).json({
      status: FAILURE,
      error: error.message,
    });
  }
};

exports.incrementDownloadCount = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("🛠 Increment request for ID:", id);

    const updatedLogo = await incrementDownloadService(id);
    
    res.status(STATUS.OK).json({
      status: SUCCESS,
      data: updatedLogo,
    });
  } catch (error) {
    console.error(" Error incrementing download count:", error);
    res.status(STATUS.SERVER_ERROR).json({
      status: FAILURE,
      message: MESSAGES.INTERNAL_ERROR,
    });
  }
};

exports.getRandomLogos=async(req,res)=>{
  try{
    const randomLogos=await getRandomLogosService();
    res.status(STATUS.OK).json({
      status: SUCCESS,
      data: randomLogos,
    });
  } catch (error) {
    console.error(" Error fetching random logos:", error);
    res.status(STATUS.SERVER_ERROR).json({
      status: FAILURE,
      message: MESSAGES.INTERNAL_ERROR,
    });
  }
}
exports.getTopDownloads = async (req, res) => {
  try {
    const topLogos = await getTopDownloadsService(12);
    res.status(STATUS.OK).json({
      status: SUCCESS,
      data: topLogos,
    });
  } catch (error) {
    console.error(" Error fetching top downloads:", error);
    res.status(STATUS.SERVER_ERROR).json({
      status: FAILURE,
      message: MESSAGES.INTERNAL_ERROR,
    });
  }
};

exports.findSearchAlphabets = async (req, res) => {
  // console.log("✅ /alphabet/search hit with query:", req.query);
  try {
    const { name, pictures } = req.query;
    const result = await searchAlphabets({ name, pictures });
    res.status(STATUS.OK).json({
      status: "SUCCESS",
      data: result,
    });
  } catch (error) {
    console.error(" Error searching alphabets:", error);
    res.status(STATUS.SERVER_ERROR).json({
      status: "FAILURE",
      message: MESSAGES.INTERNAL_ERROR,
    });
  }
};
