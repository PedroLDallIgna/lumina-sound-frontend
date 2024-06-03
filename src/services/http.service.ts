import axios, { AxiosInstance } from "axios";
import { API_URL } from "./constants";

let http: AxiosInstance;
const token = localStorage.getItem("token");

<<<<<<< Updated upstream
if (API_URL) {
    http = axios.create({
        baseURL: API_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
} else {
    throw new Error('Could not find REACT_APP_API_URL');
}
=======
http = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
});
>>>>>>> Stashed changes

export default http;
