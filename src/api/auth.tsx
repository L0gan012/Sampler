import axios from "axios";

export default async function getToken(setToken: Function) {
  axios.get("/api/auth/token").then((res) => {
    setToken(res.data.access_token);
  });
}
