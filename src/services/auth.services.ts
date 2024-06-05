import axios from "axios";
import { API_URL } from "./constants";
import { UserDTO } from "../dtos/user.dto";
import { SuccessResponse } from "../types/successResponse.type";

const ENDPOINT = '/auth';

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    expiresIn: number;
}

export type RegisterRequest = Omit<UserDTO, 'id' | 'userImage'>;

const http = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }})

const login = (data: LoginRequest) => http.post<LoginResponse>(`${ENDPOINT}/login`, data);

const register = (data: RegisterRequest) => http.post<SuccessResponse>(`${ENDPOINT}/register`, data);

export default {
    login, 
    register
};
