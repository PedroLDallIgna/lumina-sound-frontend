//import { ReactNode } from "react"

export type TrackRowProps = {
  musicUrl: string
  nameTrack: string
  artist: string
  album: string
  time: string
} & React.HTMLAttributes<HTMLHeadingElement>;