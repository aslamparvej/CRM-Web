import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if (error.response?.status === 401) {
    //   if (typeof window !== "undefined") {
    //     localStorage.removeItem("accessToken");
    //     window.location.href = "/login";
    //   }
    // }
    if (error.response?.status === 401) {
      console.log("Unauthorized API request:", error.config?.url);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
