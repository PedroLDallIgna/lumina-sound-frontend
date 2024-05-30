import { ImageDTO } from "./image.dto";

export interface UserDTO {
    id?: number;
    name: string;
    username: string | null;
    email: string;
    password: string;
    birthDate: string | null;
    sex: string;
    userImages: Array<ImageDTO>;
}
