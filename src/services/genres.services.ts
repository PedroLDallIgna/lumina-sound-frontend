import { GenreDTO } from "../dtos/genre.dto";
import backendService from "./backend";

const ENDPOINT = "/genres";

export const getAll = (): Promise<Array<GenreDTO>> => backendService.get(ENDPOINT);

export const create = (data: GenreDTO): Promise<void> => backendService.post(ENDPOINT, data);
