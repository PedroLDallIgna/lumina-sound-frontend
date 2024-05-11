import { ArtistAccountDTO } from "../dtos/artistAccount.dto";
import { SuccessResponse } from "../types/successResponse.type";
import backendService from "./backend";

const ENDPOINT = '/artists/account';

export const updateById = (id: number, data: ArtistAccountDTO): Promise<SuccessResponse> => backendService.put(`${ENDPOINT}/${id}`, data);

export const create = (data: ArtistAccountDTO): Promise<SuccessResponse> => backendService.post(ENDPOINT, data);

export const getById = (id: number): Promise<ArtistAccountDTO> => backendService.get(`${ENDPOINT}/${id}`);
