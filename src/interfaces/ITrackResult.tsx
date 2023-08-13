import IAlbum from "./IAlbum";
import IArtist from "./IArtist";

export default interface ITrackResult {
  name: string;
  album: IAlbum;
  artists: Array<IArtist>;
  uri: string;
  duration_ms: number;
}
