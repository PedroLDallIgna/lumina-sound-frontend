import { TrackDTO } from "./track.dto";

export interface PlaylistDTO {
    id?: number;
    name: string;
    description: string | null;
    userId:	number;
    createdAt: string | null;
    coverImageUrl: string | null;
    public: boolean | null;
    tracks: Array<TrackDTO>;
}
