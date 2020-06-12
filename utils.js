const { spotifyClientSecret, spotifyClientId } = require("./config");
const fetch = require("node-fetch");
const qs = require('qs');

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const getSpotifyAccessToken = async () => {
    const accountCredential = `${spotifyClientId}:${spotifyClientSecret}`;
    let buff = new Buffer(accountCredential);
    let b64encodedAccountInfo = buff.toString("base64");

    const data = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${b64encodedAccountInfo}`,
      },
      body: qs.stringify({ grant_type: "client_credentials" }),
    });
    const token = await data.json(); //full token object
    return token;
}

module.exports = { asyncHandler, getSpotifyAccessToken}