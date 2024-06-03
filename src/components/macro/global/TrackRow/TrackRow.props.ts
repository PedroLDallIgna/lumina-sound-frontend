//import { ReactNode } from "react"
//import { ArtistAccountDTO } from "../../../../dtos/artistAccount.dto";

export type TrackRowProps = {
  musicUrl: string
  nameTrack: string
  id: number | undefined
  artistName: string[]
  album: string
  time: number
} & React.HTMLAttributes<HTMLHeadingElement>;