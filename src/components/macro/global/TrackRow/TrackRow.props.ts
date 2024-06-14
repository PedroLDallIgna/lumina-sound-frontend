import { TrackResponse } from "../../../../types/trackResponse.type";

export type TrackRowProps = {
  trackId?: number | undefined
  musicUrl?: string
  nameTrack?: string
  artistId?: number | undefined
  artistName?: string | string[]
  album?: string
  time?: number | string
  track?: TrackResponse;
};
