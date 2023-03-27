import ITrackResult from "./ITrackResult";
import IUser from "./IUser";

export default interface IAppContext {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    userInfo: IUser | undefined;
    setUserInfo: Function;
    selectedSongInfo: ITrackResult | undefined;
    setSelectedSongInfo: Function;
};