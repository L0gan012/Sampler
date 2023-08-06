import axios from "axios";

export default function search(query: string, setResults: Function) {
  axios
    .get("/api/search", {params: {q: query}})
    .then((res) => {
      setResults(res.data.tracks.items);
    });
}
