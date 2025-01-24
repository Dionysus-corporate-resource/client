import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://dionysus-corporate-resource-server-e3f4.twc1.net/",
});

instance.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token");
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  // console.log("token", token);
  config.headers.Authorization = token;
  return config;
});

export default instance;
