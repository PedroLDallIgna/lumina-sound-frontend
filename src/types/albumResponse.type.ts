import { ArtistDTO } from "../dtos/artist.dto";
import { TrackResponse } from "./trackResponse.type";

export type AlbumResponse = {
    id: number;
    name: string;
    released: string;
    artistDTO: ArtistDTO;
    albumImageUrl: string;
    tracks: Array<TrackResponse>;
};
