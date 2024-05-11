import { LabelDTO } from "../dtos/label.dto";
import { SuccessResponse } from "../types/successResponse.type";
import backendService from "./backend";

const ENDPOINT = "/labels";

export const create = (data: LabelDTO): Promise<SuccessResponse> => backendService.post(ENDPOINT, data);

export const getById = (id: number): Promise<LabelDTO> => backendService.get(`${ENDPOINT}/${id}`);

export const updateById = (id: number, data: LabelDTO): Promise<SuccessResponse> => backendService.put(`${ENDPOINT}/${id}`, data);
