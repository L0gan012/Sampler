import axios from "axios";

export default async function refresh(): Promise<string> {
  let expiresIn = '';
  await axios.get("http://localhost:3001/refresh").then((res) => {
    expiresIn = res.data.expires_in;
  });

  return expiresIn;
}