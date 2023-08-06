import React, { useState, createContext, useEffect } from "react";
import getToken from "./api/auth";

import Banner from "./components/Banner/Banner";
import SongInfo from "./components/SongInfo/SongInfo";

import IAppContext from "./interfaces/IAppContext";
import ITrackResult from "./interfaces/ITrackResult";
import IUser from "./interfaces/IUser";
import Box from "@mui/material/Box";

import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/DefaultTheme";
import Player from "./components/Player/Player";

export const AppContext = createContext<IAppContext>({
  token: "",
  setToken: () => {},
  userInfo: undefined,
  setUserInfo: () => {},
  selectedSongInfo: undefined,
  setSelectedSongInfo: () => {},
});

function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState<IUser>();
  const [selectedSongInfo, setSelectedSongInfo] = useState<
    ITrackResult | undefined
  >(undefined);

  useEffect(() => {
    getToken(setToken);
  }, []);

  const appStatus = {
    token: token,
    setToken: setToken,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    selectedSongInfo: selectedSongInfo,
    setSelectedSongInfo: setSelectedSongInfo,
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
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <SongInfo />
            </Box>
          )}
          {token !== "" && <Player token={token} />}
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
