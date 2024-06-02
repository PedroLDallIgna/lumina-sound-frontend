import { GenreDTO } from "../dtos/genre.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = "/genres";

export const getAll = () => http.get<Array<GenreDTO>>(ENDPOINT);

export const create = (data: GenreDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export default {
    getAll,
    create
};
