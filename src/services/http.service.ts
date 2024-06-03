import axios, { AxiosInstance } from "axios";
import { API_URL } from "./constants";

let http: AxiosInstance;
const token = localStorage.getItem("token");

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

http = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
        "Content-Type": "application/json"
    }
});

export default http;
