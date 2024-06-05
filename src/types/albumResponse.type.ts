import { ArtistDTO } from "../dtos/artist.dto";
import { TrackResponse } from "./trackResponse.type";

export type AlbumResponse = {
    id: number;
    name: string;
    artist: ArtistDTO;
    albumImageUrl: string;
    tracks: Array<TrackResponse>;
};
