import React from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";

import AppBar from "./components/AppBar/AppBar";

function App() {
  const [profileData, setProfileData] = useState(null);

  const getData = () => {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
      })
      .catch((error) => {
        console.log("getting here");
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  return (
      <header>
        <AppBar />
        <p>To get your profile details: </p>
        <button onClick={getData}>Click me</button>
        {profileData && (
          <div>
            <p>Profile name: {profileData.profile_name}</p>
            <p>About me: {profileData.about_me}</p>
          </div>
        )}
      </header>
  );
}

export default App;
