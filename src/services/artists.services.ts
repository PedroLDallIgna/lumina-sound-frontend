import { ArtistDTO } from "../dtos/artist.dto";
import { ArtistAccountDTO } from "../dtos/artistAccount.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = "/artists";

export const get = (page: number = 0, perPage: number = 25) => http.get<Array<ArtistAccountDTO>>(`${ENDPOINT}?page=${page}&per_page=${perPage}`);

export const getByUsername = (username: string) => http.get<ArtistAccountDTO>(`${ENDPOINT}/${username}`);

export const follow = (id: number) => http.post<SuccessResponse>(`${ENDPOINT}/${id}/follow`);

export const unfollow = (id: number) => http.delete<SuccessResponse>(`${ENDPOINT}/${id}/unfollow`);

export const getUserArtists = () => http.get<Array<ArtistDTO>>("/users/library/artists");

export const getByGenre = (genreId: number, limit=25) => http.get<Array<ArtistDTO>>(`/genres/${genreId}/artists?limit=${limit}`);

export default {
    get,
    getByUsername,
    follow,
    unfollow,
    getUserArtists,
    getByGenre
};
