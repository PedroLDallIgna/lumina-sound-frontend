import { TrackDTO } from "./track.dto";

export interface AlbumDTO {
  id?: number;
  name: string;
  artistId: number;
  albumImageUrl: string | null;
  tracksIds: TrackDTO;
}