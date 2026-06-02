import axios from "axios";

const api = axios.create({
  baseURL: "/api",
//   baseURL: "http://localhost:5001/api",
});

export default api;