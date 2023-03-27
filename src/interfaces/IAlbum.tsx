import IImage from "./IImage";

export default interface IAlbum {
    name: string;
    uri: string;
    release_date: string;
    total_tracks: number;
    images: Array<IImage>;
  };