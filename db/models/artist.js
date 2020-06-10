const mongoose = require('mongoose');
const artistSchema = new mongoose.Schema({
  datasetid: {
    type: String,
    required: false,
  },
  recordid: {
    type: String,
    required: false,
  },
  fields: {
    location_city: String,
    name: String,
    location_coordinates: [Number, Number],
    bio_summary: String,
    bio_yearsactivestart: String,
    youtube_clipexampleurl: String,
    bio_url: String,
    categories: String,
  },
  geometry: {
    type: String,
    coordinates: [Number, Number],
  },
  record_timestamp: String,
});

module.exports = mongoose.model('Artist', artistSchema);