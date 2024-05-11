import axios, { AxiosInstance } from "axios";
import { API_URL } from "./constants";

let http: AxiosInstance;

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

export default http;
