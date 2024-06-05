import { LabelDTO } from "../dtos/label.dto";
import { SuccessResponse } from "../types/successResponse.type";
import { FollowDTO } from "./follow.dto";
import http from "./http.service";

const ENDPOINT = "/labels";

export const create = (data: LabelDTO) => http.post<SuccessResponse>(ENDPOINT, data);

export const getById = (id: number) => http.get<LabelDTO>(`${ENDPOINT}/${id}`);

export const updateById = (id: number, data: LabelDTO) => http.put<SuccessResponse>(`${ENDPOINT}/${id}`, data);

export const get = (page: number = 0, perPage: number = 25) => http.get<Array<LabelDTO>>(`${ENDPOINT}?page=${page}&per_page=${perPage}`);

export const follow = (data: FollowDTO) => http.post<SuccessResponse>(`${ENDPOINT}/follow`, data);

export const unfollow = (data: FollowDTO) => http.delete<SuccessResponse>(`${ENDPOINT}/unfollow`, {data});

export default {
    create,
    getById,
    updateById,
    get,
    follow,
    unfollow
};
