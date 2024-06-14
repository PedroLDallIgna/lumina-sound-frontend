import { AxiosRequestConfig } from "axios";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";
import { TrackResponse } from "../types/trackResponse.type";

const ENDPOINT = '/tracks';

export type TrackRequest = {
    id?: number | null;
    title: string;
    released: string;
    length: number;
    bpm: number;
    key: string;
    labelId: number;
    genreId: number;
    url: string;
    coverImageUrl: string;
    artistsIds: Array<number | undefined>; 
}

export const upload = (data: TrackRequest) => http.post<SuccessResponse>(`${ENDPOINT}/upload`, data);

export const getById = (id: number, config?: AxiosRequestConfig) => http.get<TrackResponse>(`${ENDPOINT}/${id}`, config);

export const get = (page=0, per_page=25) => http.get<Array<TrackResponse>>(`${ENDPOINT}?page=${page}&per_page=${per_page}`);

export const getByGenre = (genreId: number, limit=25) => http.get<Array<TrackResponse>>(`/genres/${genreId}/tracks?limit=${limit}`);

export const getByArtistUsername = (username: string) => http.get<Array<TrackResponse>>(`/artists/${username}/tracks`);

export default {
    upload,
    getById,
    get,
    getByGenre,
    getByArtistUsername
};
