const googleMapsAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"
const spotifyClientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const spotifyClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const myEnv = {
  googleMapsAPIKey,
  baseUrl,
  spotifyClientSecret,
  spotifyClientId,
  backendUrl
};

export default myEnv;