import axios from "axios";

const api = axios.create({
  // production base url 
  baseURL: "/api", 

  // local base url 
  // baseURL: "http://localhost:5001/api",
});

export default api;