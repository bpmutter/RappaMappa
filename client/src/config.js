const googleMapsAPIKey =
  process.env.GOOGLE_MAPS_API_KEY || "AIzaSyBNf4_S9tTiAgNXwUEDLgmSo6nbJ06NG7A";
const backendUrl = process.env.APP_BACKEND_URL || "http://localhost:8080";
const myEnv = {
  googleMapsAPIKey,
  backendUrl
};

export default myEnv;