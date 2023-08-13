import ITrackResult from "./ITrackResult";
import IUser from "./IUser";

export default interface IAppContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userInfo: IUser | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  selectedSongInfo: ITrackResult | undefined;
  setSelectedSongInfo: React.Dispatch<
    React.SetStateAction<ITrackResult | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
