import { PlaylistDTO } from "../dtos/playlist.dto";
import { PlaylistTrackDTO } from "../dtos/playlistTrack.dto";
import { SuccessResponse } from "../types/successResponse.type";
import { FollowDTO } from "./follow.dto";
import http from "./http.service";

const ENDPOINT = "/playlists";

type PlaylistRequest = Omit<PlaylistDTO, "id" | "tracks">;

export const updateById = (id: number, data: PlaylistRequest) => http.put<SuccessResponse>(`${ENDPOINT}/${id}`, data); 

export const getById = (id: number) => http.get<PlaylistDTO>(`${ENDPOINT}/${id}`);

export const create = (data: PlaylistRequest) => http.post<SuccessResponse>(ENDPOINT, data);

export const deleteById = (id: number) => http.delete<SuccessResponse>(`${ENDPOINT}/${id}`);

export const getAllByUserId = (username: string) => http.get<Array<PlaylistDTO>>(`/users/${username}/playlists`);

export const addTrack = (data: PlaylistTrackDTO) => http.post<SuccessResponse>(`${ENDPOINT}/track`, data)

export const removeTrack = (data: PlaylistTrackDTO) => http.delete<SuccessResponse>(`${ENDPOINT}/track`, {data});

export const follow = (data: FollowDTO) => http.post<SuccessResponse>(`${ENDPOINT}/follow`, data);

export const unfollow = (data: FollowDTO) => http.delete<SuccessResponse>(`${ENDPOINT}/unfollow`, {data});

export default {
    updateById,
    getById,
    create,
    deleteById,
    getAllByUserId,
    addTrack,
    removeTrack,
    follow,
    unfollow
};
