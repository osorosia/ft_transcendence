import axios from "axios";

export const baseURL = "http://localhost:9000";

export const axiosInstance = axios.create({ baseURL });
axiosInstance.defaults.withCredentials = true;
