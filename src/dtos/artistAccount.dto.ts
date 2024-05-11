import { ImageDTO } from "./image.dto";

export interface ArtistAccountDTO {
    id?: number;
    name: string;
    username: string;
    email: string;
    bio: string | null;
    instagramUrl: string | null;
    userId: number;
    artistImages: Array<ImageDTO>; 
}
