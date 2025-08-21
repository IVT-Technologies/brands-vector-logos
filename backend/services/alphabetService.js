const Alphabet = require("../models/Alphabet");
const mongoose = require("mongoose");
const axios = require("axios");


// Fetch logos by alphabet

const fetchLogosByAlphabet = async (alphabet, page = 1, limit = 32) => {
  if (alphabet) {
    const skip = (parseInt(page) - 1) * limit;

    const filteredLogos = await Alphabet.find({ alphabet: alphabet.toLowerCase() })
      .skip(skip)
      .limit(limit)
      .select("-source_logo_url -brand_url"); // ❌ remove these fields

    const totalCount = await Alphabet.countDocuments({ alphabet: alphabet.toLowerCase() });

    return {
      type: "filtered",
      count: totalCount,
      page: parseInt(page),
      data: filteredLogos,
    };
  }

  const alphabets = await Alphabet.aggregate([
    { $sort: { created_at: -1 } },
    {
      $group: {
        _id: "$alphabet",
        logos: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        alphabet: "$_id",
        logos: {
          $map: {
            input: { $slice: ["$logos", 4] },
            as: "logo",
            in: {
              _id: "$$logo._id",
              name: "$$logo.name",
              logo_url: "$$logo.logo_url",
              download_count: "$$logo.download_count",
              created_at: "$$logo.created_at",
              alphabet: "$$logo.alphabet"
              // ❌ no brand_url or source_logo_url
            },
          },
        },
      },
    },
    { $sort: { alphabet: 1 } },
  ]);

  return {
    type: "grouped",
    count: alphabets.length,
    data: alphabets,
  };
};



// Fetch single logo

const fetchSingleLogo = async (id) => {
  if (!id) throw new Error("ID is required");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const logo = await Alphabet.findById(id).select("-source_logo_url -brand_url");
  if (!logo) throw new Error("Product not found");

  return logo;
};


// Proxy SVG Download

const proxySVGDownloadService = async (url) => {
  if (!url || !url.startsWith("http")) {
    throw new Error("Invalid URL");
  }

  const response = await axios.get(url, {
    responseType: "text",
    timeout: 10000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/svg+xml,*/*;q=0.8",
    },
  });

  if (!response.data || !response.data.includes("<svg")) {
    throw new Error("Response is not SVG content");
  }

  return response.data;
};


// Increment Download Count

const incrementDownloadService = async (id) => {
  return await Alphabet.findByIdAndUpdate(
    id,
    { $inc: { download_count: 1 } },
    { new: true }
  );
};


// Get Top Downloads

const getTopDownloadsService = async (limit = 12) => {
  return await Alphabet.find()
    .sort({ download_count: -1 })
    .limit(limit)
    .select("name logo_url download_count");
};

//Random 12 Logos
const getRandomLogosService = async () => {
  return await Alphabet.aggregate([
    { $sample: { size: 12 } },
    {
      $project: {
        source_logo_url: 0,
        brand_url: 0
      }
    }
  ]);
};


// Search
const searchAlphabets = async ({ name, logo_url }) => {
  let filter = {};

  // If "name" is actually a URL, search in logo_url instead
  if (name) {
    if (/^https?:\/\//i.test(name)) {
      filter.logo_url = { $elemMatch: { $regex: name, $options: "i" } };
    } else {
      filter.name = { $regex: name, $options: "i" };
    }
  }

  if (logo_url) {
    filter.logo_url = { $elemMatch: { $regex: logo_url, $options: "i" } };
  }

  console.log("Search filter:", filter);

  return Alphabet.find(filter).sort({ created_at: -1 });
};

module.exports = {
  fetchLogosByAlphabet,
  fetchSingleLogo,
  proxySVGDownloadService,
  incrementDownloadService,
  getTopDownloadsService,
  getRandomLogosService,
  searchAlphabets,
};



