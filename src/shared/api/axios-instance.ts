import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "http://i0oos0ks8cgc4004sok8kwwk.91.210.170.174.sslip.io",
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = window.localStorage.getItem("token");
//   return config;
// });

export default instance;
