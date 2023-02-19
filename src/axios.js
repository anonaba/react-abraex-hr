import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("token");

const instance = axios.create({
  baseURL: "https://abrasofthr.com:3000/api",
});

// post request used for add new employee
export const authAxios = axios.create({
  baseURL: "https://abrasofthr.com:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export default instance;
