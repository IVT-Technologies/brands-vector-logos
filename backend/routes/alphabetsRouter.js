const express = require('express');
const router = express.Router();
const { getAllByAlphabets, getSingleProduct, proxySVGDownload,incrementDownloadCount,getTopDownloads,findSearchAlphabets, getRandomLogos } = require('../controllers/AlphabetController');

router.get('/logos', getAllByAlphabets);
router.get('/logos/:id', getSingleProduct);
router.get("/proxy", proxySVGDownload);
router.patch("/increment-download/:id", incrementDownloadCount);
router.get("/top-downloads", getTopDownloads);
router.get("/search", findSearchAlphabets);
router.get("/random", getRandomLogos);



module.exports = router;
