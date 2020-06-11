const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const {asyncHandler, getSpotifyAccessToken} = require('./utils');
const port = process.env.PORT || 8080;
const {database, environment} = require('./config');
const Artist = require('./db/models/artist');
const app = express();
// const cdb = 'mongodb+srv://testuser:testpassword@rappamappadb-g8rkp.mongodb.net/RappaMappa?retryWrites=true&w=majority';

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

//get and refresh spotify access token every hour
let spotifyAccessToken, spotifyAccessTokenVal;
(async ()=>{
    spotifyAccessToken = await getSpotifyAccessToken();
    spotifyAccessTokenVal = spotifyAccessToken.access_token;
})();
setInterval(async ()=>{
    spotifyAccessToken = await getSpotifyAccessToken();
    spotifyAccessTokenVal = spotifyAccessToken.access_token;
}, 3500000);



app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (environment === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get(
  "/artists/",
  asyncHandler(async (req, res) => {
    const allArtists = await Artist.find({});
    console.log("ALL ARTISTS::", allArtists);
    res.send({ allArtists });
  })
);

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

app.listen(port, () => console.log(`Listening on port ${port}`));
