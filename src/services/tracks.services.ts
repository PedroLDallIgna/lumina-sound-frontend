import { TrackDTO } from "../dtos/track.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = '/tracks';

export const upload = (data: TrackDTO) => http.post<SuccessResponse>(`${ENDPOINT}/upload`, data);

export const getById = (id: number) => http.get<TrackDTO>(`${ENDPOINT}/${id}`);
