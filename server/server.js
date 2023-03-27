require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const querystring = require("querystring");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();
app.use(cors());
app.use(bodyParser.json());

let spotifyApi = new SpotifyWebApi({
  redirectUri: REDIRECT_URI,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

const stateKey = 'spotify_auth_state';

// OAuth 2.0 related requests
app.get("/authurl", (req, res) => {
  const scopes = ['user-read-private', 'user-read-email'];
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.json({ url: spotifyApi.createAuthorizeURL(scopes, state, true) });
});

app.get("/callback", (req, res) => {
  const code = req.query.code;

  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      spotifyApi.setRefreshToken(data.body.refresh_token);
      const queryParams = querystring.stringify({
        logged_in: true,
        expires_in: data.body.expires_in,
      });
      res.redirect(`http://localhost:3000/?${queryParams}`);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.get("/refresh", (req, res) => {
  spotifyApi.refreshAccessToken().then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
    res.json({expires_in: data.body.expires_in})
  });
});

// User account requests
app.get("/me", (req, res) => {
  spotifyApi.getMe().then((data) => {
    res.json(data.body);
  });
});

// Search requests
app.get("/search", (req, res) => {
  const { query } = req.query;
  if(query !== '') {
    spotifyApi.searchTracks(query).then((data) => { 
      res.json(data.body.tracks);
    });
  }
});

app.listen(3001);
