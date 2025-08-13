const mongoose = require('mongoose');

const alphabetsSchema = new mongoose.Schema({
  name: String,
  p_id: String,
  alphabet: String,
  brand_url: String,
  pictures: [String],
  created_at: Date,
  updated_at: Date,
  download_count: { type: Number, default: 0 },
});

const Alphabet = mongoose.model("Alphabet", alphabetsSchema);
module.exports = Alphabet;