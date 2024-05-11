import { PlaylistDTO } from "../dtos/playlist.dto";
import { SuccessResponse } from "../types/successResponse.type";
import backendService from "./backend";

const ENDPOINT = "/playlists";

export const updateById = (id: number, data: PlaylistDTO): Promise<SuccessResponse> => backendService.put(`${ENDPOINT}/${id}`, data); 

export const getById = (id: number): Promise<PlaylistDTO> => backendService.get(`${ENDPOINT}/${id}`);

export const create = (data: PlaylistDTO): Promise<SuccessResponse> => backendService.post(ENDPOINT, data);

export const deleteById = (id: number): Promise<SuccessResponse> => backendService.delete(`${ENDPOINT}/${id}`);

export const getAllByUserId = (id: number): Promise<Array<PlaylistDTO>> => backendService.get(`/users/${id}/playlists`);
