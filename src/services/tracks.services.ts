import { AxiosRequestConfig } from "axios";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";
import { TrackResponse } from "../types/trackResponse.type";

const ENDPOINT = '/tracks';

type TrackRequest = {
    id?: number;
    title: string;
    release: string;
    length: number;
    bpm: number;
    key: string;
    labelId: number;
    genreId: number;
    url: string;
    coverImageUrl: string;
    artistsIds: Array<number>; 
}

export const upload = (data: TrackRequest) => http.post<SuccessResponse>(`${ENDPOINT}/upload`, data);

export const getById = (id: number, config?: AxiosRequestConfig) => http.get<TrackResponse>(`${ENDPOINT}/${id}`, config);

export const get = (page=0, per_page=25) => http.get<Array<TrackResponse>>(`${ENDPOINT}?page=${page}&per_page=${per_page}`);

export const getByGenre = (genreId: number, limit=25) => http.get<Array<TrackResponse>>(`/genres/${genreId}/tracks?limit=${limit}`)

export default {
    upload,
    getById,
    get
};
