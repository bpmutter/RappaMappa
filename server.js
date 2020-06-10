const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const fetch = require('node-fetch')
const {asyncHandler, getSpotifyAccessToken} = require('./utils');
const app = express();
const port = process.env.PORT || 8080;
//TODO add dotenv stuff 


//get and refresh spotify access token every hour
let spotifyAccessToken, spotifyAccessTokenVal;
(async ()=>{
    spotifyAccessToken = await getSpotifyAccessToken();
    spotifyAccessTokenVal = spotifyAccessToken.access_token;
    console.log("TOKEN VAL", spotifyAccessToken)
})();
setInterval(async ()=>{
    spotifyAccessToken = await getSpotifyAccessToken();
    spotifyAccessTokenVal = spotifyAccessToken.access_token;
}, 3500000);

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//TODO add async handler
app.get("/spotify/more-info/:artist", asyncHandler(async (req, res)=>{
    const artistName = req.params.artist;
    const data = await fetch(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${spotifyAccessTokenVal}`,
        },
      }
    );
    const json = await data.json();
    const artistInfo = json.artists.items[0];
    res.send({artistInfo});
}));

// API calls
app.get("/derp", (req,res)=>{res.send({body: 'please do something'})})

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/build")));

//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
