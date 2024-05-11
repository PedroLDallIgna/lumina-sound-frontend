import { LabelDTO } from "../dtos/label.dto";
import backendService from "./backend";

const ENDPOINT = "/labels";

export const create = (data: LabelDTO): Promise<void> => backendService.post(ENDPOINT, data);

export const getById = (id: number): Promise<LabelDTO> => backendService.get(`${ENDPOINT}/${id}`);

export const updateById = (id: number, data: LabelDTO): Promise<void> => backendService.put(`${ENDPOINT}/${id}`, data);
