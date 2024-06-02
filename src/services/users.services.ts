import { SuccessResponse } from "../types/successResponse.type";
import { UserDTO } from "../dtos/user.dto";
import http from "./http.service";

const ENDPOINT = '/users';

export const getById = (id: number, config = {}) => http.get<UserDTO>(`${ENDPOINT}/${id}`, config);

export const confirmAccount = (id: number, token: string, config = {}) => http.get<SuccessResponse>(`${ENDPOINT}/${id}/confirm-email/${token}`, config);

export const updateById = (id: number, data: UserDTO, config = {}) => http.put<SuccessResponse>(`${ENDPOINT}/${id}/account`, data, config);

export default {
    getById,
    confirmAccount,
    updateById
};
