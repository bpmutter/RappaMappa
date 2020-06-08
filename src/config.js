const googleMapsAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000/";
const spotifyAPIKey = process.env.REACT_APP_SPOTIFY_API_KEY;
const myEnv = {
  googleMapsAPIKey,
  baseUrl,
  spotifyAPIKey,
};

export default myEnv;