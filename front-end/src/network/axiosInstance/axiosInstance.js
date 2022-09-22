import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://northwind.vercel.app/api/",
  timeout: 1000,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
