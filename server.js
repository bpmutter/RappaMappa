const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const {asyncHandler, getSpotifyAccessToken} = require('./utils');
const port = process.env.PORT || 8080;
const {database, environment} = require('./config');
const Artists = require('./db/models/artist');
const app = express();
mongoose.connect(database, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (err)=>console.error('error::', err));
db.once('open', ()=> console.log('connected to DB'));

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


if(environment !== 'production'){
  let whitelist = ["http://localhost:3000", "http://localhost:5000"];
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (environment === "production") {
  console.log('hello there')
  app.use(express.static(path.join(__dirname, "client/build")));
}

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

app.get("/artists/", asyncHandler(async (req,res)=>{
  const allArtists = await Artists.find({});
  console.log(allArtists)
  res.send({allArtists});
}))

// NOTE: PROB DON'T NEED 
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
