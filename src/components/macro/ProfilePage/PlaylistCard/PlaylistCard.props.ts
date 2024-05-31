import { ReactNode } from "react"

export type PlaylistCardProps = {
  path: string
  imgUrl: string
  nomePlaylist: string
} & React.HTMLAttributes<HTMLHeadingElement>;