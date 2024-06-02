import { ArtistDTO } from "../dtos/artist.dto";
import { AlbumResponse } from "../types/albumResponse.type";
import { SuccessResponse } from "../types/successResponse.type";
import { FollowDTO } from "./follow.dto";
import http from "./http.service";

const ENDPOINT = "/artists";

export const get = (page: number = 0, perPage: number = 25) => http.get<Array<ArtistDTO>>(`${ENDPOINT}?page=${page}&per_page=${perPage}`);

export const getByUsername = (username: string) => http.get<ArtistDTO>(`${ENDPOINT}/${username}`);

export const follow = (data: FollowDTO) => http.post<SuccessResponse>(`${ENDPOINT}/follow`, data);

export const unfollow = (data: FollowDTO) => http.delete<SuccessResponse>(`${ENDPOINT}/unfollow`, {data});

export default {
    get,
    getByUsername,
    follow,
    unfollow,
};
