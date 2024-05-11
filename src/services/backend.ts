import axios, { AxiosInstance } from "axios";
import { API_URL } from "./constants";

let backendService: AxiosInstance;

if (API_URL) {
    backendService = axios.create({
        baseURL: API_URL,
        headers: {
            Accept: "application/json"
        }
    });
} else {
    throw new Error('Could not find REACT_APP_API_URL');
}

export default backendService;
