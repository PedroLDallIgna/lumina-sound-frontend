import { PlaylistDTO } from "../dtos/playlist.dto";
import backendService from "./backend";

const ENDPOINT = "/playlists";

export const updateById = (id: number, data: PlaylistDTO) => backendService.put(`${ENDPOINT}/${id}`, data); 

export const getById = (id: number): Promise<PlaylistDTO> => backendService.get(`${ENDPOINT}/${id}`);

export const create = (data: PlaylistDTO): Promise<void> => backendService.post(ENDPOINT, data);

export const deleteById = (id: number): Promise<void> => backendService.delete(`${ENDPOINT}/${id}`);
