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

export const getAll = () => http.get<Array<TrackResponse>>(ENDPOINT);

export default {
    upload,
    getById,
    getAll
};
