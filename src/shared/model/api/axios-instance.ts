import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://server.gruzrynok.ru/api/v1",
  // baseURL: "https://dionysus-corporate-resource-server-b061.twc1.net/api/v1",
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
