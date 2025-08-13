const Mongo_Connect = require("./config/db");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const alphabetsRouter = require('./routes/alphabetsRouter');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/alphabet', alphabetsRouter);

// Start server
app.listen(PORT, () => {
  Mongo_Connect();
  console.log(`Server running on port localhost:${PORT}`);
});
