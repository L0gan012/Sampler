import axios from "axios";

export default async function user(setUserInfo: Function) {
  await axios
    .get("/api/me")
    .then((res) => {
        setUserInfo(res.data);
    });
}