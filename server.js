const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const {asyncHandler, getSpotifyAccessToken} = require('./utils');
const port = process.env.PORT || 8080;
const {database, environment} = require('./config');
// const Artists = require('./db/models/artist');
const app = express();
const cdb = 'mongodb+srv://testuser:testpassword@rappamappadb-g8rkp.mongodb.net/RappaMappa?retryWrites=true&w=majority';

const artistSchema = new mongoose.Schema({
  datasetid: String,
  recordid: String,
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
const Artist = mongoose.model("Artist", artistSchema );

mongoose.connect(cdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("Connected to MongoDB successfully"))
  // .then(() => {
  //   // const Artist = require("./db/models/artist");
  //   Artist.find({}).then((events) => {
  //     console.log("ARTISTS:", events);
  //   });

  // })
  .catch((err) => console.log(err));

  // const db = mongoose.connection;
  // db.on("open", function () {
  //   db.db.listCollections().toArray(function (err, names) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(names);
  //     }
  //     // Artist.find().exec(function (err, results) {
  //     //   var count = results.length;
  //     //   console.log("COUNT",count);
  //     // });

  //     mongoose.connection.close();
  //   });
  // });

// db.on('error', (err)=>console.error('error::', err));
// db.on('open', ()=> console.log('connected to DB'));

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
// let whitelist = [
//   "http://localhost:3000",
//   "http://localhost:5000",
//   "https://nameless-headland-04288.herokuapp.com/",
//   "/"
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (environment === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get(
  "/artists/",
  asyncHandler(async (req, res) => {
    const allArtists = await Artist.find({});
    console.log("ALL ARTISTS::", allArtists[55]);
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
