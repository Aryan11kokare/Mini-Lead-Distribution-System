import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-lead-distribution-system-gymt.onrender.com/api",
});

export default api;
