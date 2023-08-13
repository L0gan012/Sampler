import { createContext } from "react";

import IAppContext from "./interfaces/IAppContext";
import ITrackResult from "./interfaces/ITrackResult";
import IUser from "./interfaces/IUser";

export const AppContext = createContext<IAppContext>({
    token: "",
    setToken: () => {},
    userInfo: undefined,
    setUserInfo: () => {},
    selectedSongInfo: undefined,
    setSelectedSongInfo: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
  });