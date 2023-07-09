import React, { useState, createContext, useEffect } from "react";
import { loggedIn } from "./utils/spotifyUtils";

import Banner from "./components/Banner/Banner";
import SongInfo from "./components/SongInfo/SongInfo";

import IAppContext from "./interfaces/IAppContext";
import ITrackResult from "./interfaces/ITrackResult";
import IUser from "./interfaces/IUser";
import Box from "@mui/material/Box";

import './index.css';

export const AppContext = createContext<IAppContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: undefined,
  setUserInfo: () => {},
  selectedSongInfo: undefined,
  setSelectedSongInfo: () => {},
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>();
  const [selectedSongInfo, setSelectedSongInfo] = useState<
    ITrackResult | undefined
  >(undefined);

  useEffect(() => {
    setIsLoggedIn(loggedIn);
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
    <AppContext.Provider value={appStatus}>
      <Banner title="Samplify" />
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <SongInfo />
      </Box>
    </AppContext.Provider>
  );
}

export default App;
