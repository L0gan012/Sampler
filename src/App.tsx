import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/DefaultTheme";
import Box from "@mui/material/Box";

import Banner from "./components/Banner/Banner";
import SongInfo from "./components/SongInfo/SongInfo";
import SongController from "./components/SongControls/SongController";

import ITrackResult from "./interfaces/ITrackResult";
import IUser from "./interfaces/IUser";

import getToken from "./api/auth";

import usePlayer from "./hooks/usePlayer";

import "./index.css";

function App() {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUser>();
  const [selectedSongInfo, setSelectedSongInfo] = useState<
    ITrackResult | undefined
  >(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    getToken(setToken);
  }, []);

  usePlayer(token, setToken);

  const appStatus = {
    token,
    setToken,
    userInfo,
    setUserInfo,
    selectedSongInfo,
    setSelectedSongInfo,
    isPlaying,
    setIsPlaying,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appStatus}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Banner title="Samplify" />
          {selectedSongInfo && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <SongInfo />
              <SongController />
            </Box>
          )}
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
