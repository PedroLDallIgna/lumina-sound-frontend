import { SuccessResponse } from "../types/successResponse.type";
import { UserDTO } from "../dtos/user.dto";
import backendService from "./backend";

const ENDPOINT = '/users';

export const getById = (id: number): Promise<UserDTO> => backendService.get(`${ENDPOINT}/${id}`);

export const confirmAccount = (id: number, token: string): Promise<SuccessResponse> => backendService.get(`${ENDPOINT}/${id}/confirm-email/${token}`);

export const updateById = (id: number, data: UserDTO): Promise<SuccessResponse> => backendService.put(`${ENDPOINT}/${id}/account`, data);
