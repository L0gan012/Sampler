import axios from "axios";

export default async function authurl() {
  let url;

  await axios.get("http://localhost:3001/authurl").then((res) => {
    url = res.data.url;
  });

  return url;
}
