import { PlaylistDTO } from "../dtos/playlist.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = "/playlists";

export const updateById = (id: number, data: PlaylistDTO) => http.put<SuccessResponse>(`${ENDPOINT}/${id}`, data); 

export const getById = (id: number) => http.get<PlaylistDTO>(`${ENDPOINT}/${id}`);

export const create = (data: PlaylistDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export const deleteById = (id: number) => http.delete<SuccessResponse>(`${ENDPOINT}/${id}`);

export const getAllByUserId = (id: number) => http.get<Array<PlaylistDTO>>(`/users/${id}/playlists`);
