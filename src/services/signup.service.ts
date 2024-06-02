import { SignupBody } from "../types/signupBody.type";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = '/sing-up';

export const signup = (data: SignupBody) => http.post<SuccessResponse>(ENDPOINT, data);

export default {
    signup
};
