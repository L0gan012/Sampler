import IImage from "./IImage";

export default interface IUser {
    display_name: string;
    images: Array<IImage>;
};