import { SignupBody } from "../types/signupBody.type";
import { SuccessResponse } from "../types/successResponse.type";
import backendService from "./backend";

const ENDPOINT = '/sing-up';

export const signup = (data: SignupBody): Promise<SuccessResponse> => backendService.post(ENDPOINT, data);
