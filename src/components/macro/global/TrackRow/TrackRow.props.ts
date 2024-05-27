//import { ReactNode } from "react"
//import { ArtistAccountDTO } from "../../../../dtos/artistAccount.dto";

export type TrackRowProps = {
  musicUrl: string
  nameTrack: string
  artistId: string
  artistName: string
  album: string
  time: string
} & React.HTMLAttributes<HTMLHeadingElement>;