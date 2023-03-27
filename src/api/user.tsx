import axios from "axios";

export default async function user() {
  let user = {};
  await axios
    .get("http://localhost:3001/me")
    .then((res) => {
        user = res.data
    });
    return user;
}