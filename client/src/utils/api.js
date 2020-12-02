import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fileUploadApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
