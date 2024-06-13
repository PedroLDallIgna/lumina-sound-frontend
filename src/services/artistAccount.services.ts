import { ArtistAccountDTO } from "../dtos/artistAccount.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = '/artists/account';

export const update = (data: ArtistAccountDTO) => http.put<SuccessResponse>(ENDPOINT, data);

export const create = (data: ArtistAccountDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export const get = (config={}) => http.get<ArtistAccountDTO>(`${ENDPOINT}`, config);

export default {
    update,
    create,
    get
};
