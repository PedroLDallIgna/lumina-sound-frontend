import axios, { AxiosInstance } from "axios";
import { API_URL } from "./constants";
import store from "../store";

let http: AxiosInstance;

if (API_URL) {
    const SESSION_TOKEN = store.getState().general.sessionToken

    http = axios.create({
        baseURL: API_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${SESSION_TOKEN}`
        }
    });
} else {
    throw new Error('Could not find REACT_APP_API_URL');
}

export default http;
