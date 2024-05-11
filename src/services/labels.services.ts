import { LabelDTO } from "../dtos/label.dto";
import { SuccessResponse } from "../types/successResponse.type";
import http from "./http.service";

const ENDPOINT = "/labels";

export const create = (data: LabelDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export const getById = (id: number) => http.get<LabelDTO>(`${ENDPOINT}/${id}`);

export const updateById = (id: number, data: LabelDTO) => http.put<SuccessResponse>(`${ENDPOINT}/${id}`, data);
