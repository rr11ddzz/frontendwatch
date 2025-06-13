import axios from 'axios';
let axiosInstance = "";
if (typeof window !== "undefined") {
  axiosInstance = axios.create({
    baseURL: process.env.NEXT_APP_HOST,
    headers: {
      'Content-Type': 'application/json',
      "Authentication": localStorage.getItem('secret-login-token')
    },
  });
}
export default axiosInstance;