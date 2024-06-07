import { SearchResponse } from "../types/searchResponse.type";
import http from "./http.service";

const ENDPOINT = "/search"

export const search = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword);
    return http.get<SearchResponse>(`${ENDPOINT}?keyword=${encodedKeyword}`);
}

export default {
    search
}
