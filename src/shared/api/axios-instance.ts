import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://server.nathani.ru",
});

instance.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token");
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  config.headers.Authorization = token;
  return config;
});

export default instance;
