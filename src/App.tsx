import React, { useState, createContext, useEffect } from "react";
import { loggedIn } from "./utils/spotifyUtils";
import getToken from "./api/authurl";

import Banner from "./components/Banner/Banner";
import SongInfo from "./components/SongInfo/SongInfo";

import IAppContext from "./interfaces/IAppContext";
import ITrackResult from "./interfaces/ITrackResult";
import IUser from "./interfaces/IUser";
import Box from "@mui/material/Box";

import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/DefaultTheme";
import LoginButton from "./components/LoginButton/LoginButton";
import Player from "./components/Player/Player";

export const AppContext = createContext<IAppContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: undefined,
  setUserInfo: () => {},
  selectedSongInfo: undefined,
  setSelectedSongInfo: () => {},
});

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>();
  const [selectedSongInfo, setSelectedSongInfo] = useState<
    ITrackResult | undefined
  >(undefined);

  // useEffect(() => {
  //   setIsLoggedIn(loggedIn);
  // }, []);

  useEffect(() => {
    getToken(setToken);
  }, []);

  const appStatus = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    selectedSongInfo: selectedSongInfo,
    setSelectedSongInfo: setSelectedSongInfo,
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <AppContext.Provider value={appStatus}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          {token === '' ? <LoginButton /> : <Player token={token} />}
          {/* <Banner title="Samplify" /> */}
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {selectedSongInfo && <SongInfo />}
          </Box> */}
        </Box>
      {/* </AppContext.Provider> */}
    </ThemeProvider>
  );
}

export default App;
