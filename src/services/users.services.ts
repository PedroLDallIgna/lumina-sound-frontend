import { UserDTO } from "../dtos/user.dto";
import backendService from "./backend";

const ENDPOINT = '/users';

export const getById = (id: number): Promise<UserDTO> => backendService.get(`${ENDPOINT}/${id}`);

export const confirmAccount = (id: number, token: string) => backendService.get(`${ENDPOINT}/${id}/confirm-email/${token}`);

export const updateById = (id: number, data: UserDTO) => backendService.put(`${ENDPOINT}/${id}/account`, data);
