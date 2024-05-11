import { ArtistAccountDTO } from "../dtos/artistAccount.dto";
import backendService from "./backend";

const ENDPOINT = '/artists/account';

export const updateById = (id: number, data: ArtistAccountDTO) => backendService.put(`${ENDPOINT}/${id}`, data);

export const create = (data: ArtistAccountDTO) => backendService.post(ENDPOINT, data);

export const getById = (id: number): Promise<ArtistAccountDTO> => backendService.get(`${ENDPOINT}/${id}`);
