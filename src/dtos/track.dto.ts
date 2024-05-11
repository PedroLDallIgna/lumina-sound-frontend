import { ArtistDTO } from "./artist.dto";
import { GenreDTO } from "./genre.dto";
import { LabelDTO } from "./label.dto";

export interface TrackDTO {
    id?: number;
    title: string;
    release: string;
    length: number;
    bpm: number;
    key: string;
    label: LabelDTO;
    genre: GenreDTO;
    url: string;
    coverImageUrl: string;
    artists: Array<ArtistDTO>;
}
