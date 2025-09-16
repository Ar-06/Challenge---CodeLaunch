import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const axiosTask = axios.create({
  baseURL: `${VITE_API_URL}/tasks`,
  withCredentials: true,
});

export default axiosTask;
