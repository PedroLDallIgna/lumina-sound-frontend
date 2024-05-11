import { ImageDTO } from "./image.dto";

export interface UserDTO {
    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    birthDate: string | null;
    sex: string;
    userImage: Array<ImageDTO>;
}
