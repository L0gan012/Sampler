const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const port = 5000;

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

global.access_token = "";
global.refresh_token = "";
global.expires_in = -1;
global.time_signed_in = -1;

var app = express();
app.use(express.json());

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
  var scope =
    "streaming playlist-modify-private user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing";

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

  axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
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
  })
    .then((response) => {
      if (response.status === 200) {
        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;
        expires_in = response.data.expires_in * 1000;
        time_signed_in = Date.now();
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.error("Couldn't get access token: ", error.message);
      res.redirect("/");
    });
});

// Gets the access token used for making requests
app.get("/api/auth/token", (req, res) => {
  if(time_signed_in != -1 && Date.now() - time_signed_in >= expires_in) {
    res.redirect('/api/auth/refresh_token');
  } else {
    res.json({
      access_token: access_token,
    });
  }
});

// Gets the new access token when current token has expired
app.get("/api/auth/refresh_token", (req, res) => {
  axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  })
    .then((response) => {
      console.log(response.data);
      access_token = response.data.access_token;
      expires_in = response.data.expires_in;
      time_signed_in = Date.now();
      res.json({
        access_token: access_token,
      });
    })
    .catch((error) => {
      console.error("Couldn't refresh token: ", error.message);
    });
});

// Gets information on the logged in user
app.get("/api/me", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/me",
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      }
    })
    .catch((error) => {
      console.error("Couldn't get user information: ", error.message);
    });
});

// Gets tracks that match the search query
app.get("/api/search", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/search",
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      q: req.query.q,
      type: "track",
      limit: "10",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      }
    })
    .catch((error) => {
      console.error("Couldn't find tracks with query: ", req.query.q, error.message);
    });
});

app.get("/api/devices", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/me/player/devices",
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// Transfers playback to the provided device
app.put("/api/transfer_playback", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/me/player",
    method: "put",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    data: {
      device_ids: [req.body.id],
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Plays given song on current device
app.put("/api/play_song", (req, res) => {
  const data = req.body.uri ? { uris: [req.body.uri] } : {};
  axios({
    url: "Https://api.spotify.com/v1/me/player/play",
    method: "put",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    data,
  })
    .then((response) => {
      res.send("playing");
    })
    .catch((error) => {
      console.error(error);
    });
});

// Pauses current song on current device
app.put("/api/pause_song", (req, res) => {
  axios({
    url: "Https://api.spotify.com/v1/me/player/pause",
    method: "put",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => {
      res.send("paused");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
