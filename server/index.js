const express = require("express");
const request = require("request");
const dotenv = require("dotenv");

const port = 5000;

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

global.access_token = '';

var app = express();

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Sends user to the spotify authorization page
app.get("/api/auth/login", (req, res) => {
  var scope = "streaming user-read-email user-read-private";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

// Endpoint hit when the user verifies that Sampler can use their Spotify information
app.get("/api/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect("/");
    }
  });
});

// Gets the access token used for making requests
app.get("/api/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
  });
});

app.get("/api/me", (req, res) => {
  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }
  request.get(options, function (error, response, body) {
    if(!error && response.statusCode === 200){
      res.send(body);
    }
  })
});

app.get("/api/search", (req, res) => {
  var options = {
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    qs: {q: req.query.q, type: 'track', limit: '10'},
  }
  request.get(options, function (error, response, body) {
    if(!error && response.statusCode === 200){ 
      console.log('getting here');
      res.send(body);
    }
    console.log('still error')
  })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
