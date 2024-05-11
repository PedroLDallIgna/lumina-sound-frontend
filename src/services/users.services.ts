import { SuccessResponse } from "../types/successResponse.type";
import { UserDTO } from "../dtos/user.dto";
import http from "./http.service";

const ENDPOINT = '/users';

export const getById = (id: number) => http.get<UserDTO>(`${ENDPOINT}/${id}`);

export const confirmAccount = (id: number, token: string) => http.get<SuccessResponse>(`${ENDPOINT}/${id}/confirm-email/${token}`);

export const updateById = (id: number, data: UserDTO) => http.put<SuccessResponse>(`${ENDPOINT}/${id}/account`, data);
