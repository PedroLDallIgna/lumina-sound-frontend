import { TrackDTO } from "../dtos/track.dto";
import backendService from "./backend";

const ENDPOINT = '/tracks';

export const upload = (data: TrackDTO) => backendService.post(`${ENDPOINT}/upload`, data);

export const getById = (id: number): Promise<TrackDTO> => backendService.get(`${ENDPOINT}/${id}`);
