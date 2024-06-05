import { ArtistDTO } from "../dtos/artist.dto";
import { GenreDTO } from "../dtos/genre.dto";
import { LabelDTO } from "../dtos/label.dto";

export type TrackResponse = {
    id: number;
    title: string;
    released: string;
    length: number;
    bpm: number;
    key: string;
    label: LabelDTO;
    genre: GenreDTO;
    url: string;
    coverImageUrl: string;
    artists: Array<ArtistDTO>;
}