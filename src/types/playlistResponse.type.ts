import { TrackResponse } from "./trackResponse.type";

export type PlaylistResponse = {
    id: number;
    name: string;
    description: string;
    userId: string;
    createdAt: string;
    coverImageUrl: string;
    tracks: TrackResponse[];
    public: boolean;
};
