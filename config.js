require("dotenv").config();

const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const baseUrl = process.env.BASE_URL || "http://localhost:8080/";
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET 
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID 
const database = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_DEV; // || "mongodb://localhost/artists";
const port = process.env.PORT || 8080
const environment = process.env.NODE_ENV || 'development'
const myEnv = {
  googleMapsAPIKey,
  baseUrl,
  spotifyClientSecret,
  spotifyClientId,
  database,
  port,
  environment
};

module.exports = myEnv;
