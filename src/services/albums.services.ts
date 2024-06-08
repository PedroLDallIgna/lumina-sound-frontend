import { AlbumTrackDTO } from "../dtos/albumTrack.dto";
import { AlbumResponse } from "../types/albumResponse.type";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = "/albums";

export type AlbumRequest = {
    id: number;
    name: string;
    artistId: number;
    albumImageUrl: string;
    trackIds: Array<number>;
}

export const create = (data: AlbumRequest) => http.post<SuccessResponse>(ENDPOINT, data);

export const addTrack = (data: AlbumTrackDTO) => http.post<SuccessResponse>(`${ENDPOINT}/tracks`, data);

export const getById = (id: number) => http.get<AlbumResponse>(`${ENDPOINT}/${id}`);

export const getByArtistUsername = (username: string) => http.get<Array<AlbumResponse>>(`/artists/${username}/albums`);

export const getByGenre = (genreId: number, limit=25) => http.get<Array<AlbumResponse>>(`/genres/${genreId}/albums?limit=${limit}`)

export default {
    create,
    addTrack,
    getById,
    getByArtistUsername,
    getByGenre
};
