import axios, { AxiosInstance } from "axios";
import { API_URL } from "./constants";

let http: AxiosInstance;

http = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default http;
