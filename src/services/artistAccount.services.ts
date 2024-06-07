import { ArtistAccountDTO } from "../dtos/artistAccount.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = '/artists/account';

export const update = (data: ArtistAccountDTO) => http.put<SuccessResponse>(ENDPOINT, data);

export const create = (data: ArtistAccountDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export const getByUsername = (username: string) => http.get<ArtistAccountDTO>(`${ENDPOINT}/${username}`);

export default {
    update,
    create,
    getByUsername
};
