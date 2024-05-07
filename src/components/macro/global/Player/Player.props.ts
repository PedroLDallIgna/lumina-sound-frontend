//import { ReactNode } from "react"

export type PlayerProps = {
  musicUrl: string
  nameTrack: string
  artist: string
  album: string
  time: string
} & React.HTMLAttributes<HTMLHeadingElement>;