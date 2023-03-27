import axios from "axios";

export default function search(query: string, setResults: Function) {
  axios
    .get("http://localhost:3001/search", {params: {query: query}})
    .then((res) => {
      setResults(res.data.items);
    });
}
