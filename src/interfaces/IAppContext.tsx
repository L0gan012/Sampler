import ITrackResult from "./ITrackResult";
import IUser from "./IUser";

export default interface IAppContext {
    token: string;
    setToken: Function;
    userInfo: IUser | undefined;
    setUserInfo: Function;
    selectedSongInfo: ITrackResult | undefined;
    setSelectedSongInfo: Function;
};