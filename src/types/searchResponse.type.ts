import { ArtistDTO } from "../dtos/artist.dto";
import { LabelDTO } from "../dtos/label.dto";
import { AlbumResponse } from "./albumResponse.type";
import { TrackResponse } from "./trackResponse.type";

export type SearchResponse = {
    keyword: string;
    foundTracks: Array<TrackResponse>;
    foundArtists: Array<ArtistDTO>;
    foundAlbums: Array<AlbumResponse>;
    foundLabels: Array<LabelDTO>;
}
