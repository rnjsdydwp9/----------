import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "d1544588fb4a8cc8520e478e577e1a44",
    language: "ko-KR",
  },
});
export default instance;
