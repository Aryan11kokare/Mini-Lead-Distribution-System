import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-lead-distribution-system-7cok.onrender.com/api",
});

export default api;
