import { ArtistAccountDTO } from "../dtos/artistAccount.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = '/artists/account';

export const updateById = (id: number, data: ArtistAccountDTO) => http.put<SuccessResponse>(`${ENDPOINT}/${id}`, data);

export const create = (data: ArtistAccountDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export const getByUsername = (username: string) => http.get<ArtistAccountDTO>(`artists/${username}`);

export default {
    updateById,
    create,
    getByUsername
};
