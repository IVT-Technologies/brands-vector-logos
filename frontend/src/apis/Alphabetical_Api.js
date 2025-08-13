
import axios from "axios";
import { BASE_URL } from "../constants";

export const fetchLogos = async (alphabet = "", page = 1) => {
  try {
    const url = alphabet
      ? `${BASE_URL}/logos?alphabet=${alphabet}&page=${page}`
      : `${BASE_URL}/logos?page=${page}`;

    const res = await axios.get(url);
    let data = res.data?.data;
    if (!Array.isArray(data)) data = [];
    return data;
  } catch (error) {
    console.log("Error fetching logos", error);
    return [];
  }
};


export const fetchTopDownloadedLogos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/top-downloads`);
    return res.data.data || [];
  } catch (err) {
      console.error(" Error fetching top downloads:", err);
      return [];
  }
};

export const randomLogos = async()=>{
  try {
    const res=await axios.get(`${BASE_URL}/random`);
     return res.data.data || [];
  } catch (err) {
    console.error(" Error fetching random logos:", err);
    return [];
  }
}



export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/logos/${id}`);
  return res.data.data;
};

export const getProxiedSvg = async (svgUrl) => {
  const res = await axios.get(`${BASE_URL}/proxy?url=${encodeURIComponent(svgUrl)}`, {
    responseType: "text",
  });
  return res.data;
};

export const incrementDownloadCount = async (id) => {
  return axios.patch(`${BASE_URL}/increment-download/${id}`);
};