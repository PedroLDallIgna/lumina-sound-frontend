import { GenreDTO } from "../dtos/genre.dto";
import { SuccessResponse } from "../types/successResponse.type";
import backendService from "./backend";

const ENDPOINT = "/genres";

export const getAll = (): Promise<Array<GenreDTO>> => backendService.get(ENDPOINT);

export const create = (data: GenreDTO): Promise<SuccessResponse> => backendService.post(ENDPOINT, data);
