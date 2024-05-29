import { ReactNode } from "react"

export type PlaylistCardProps = {
  nomePlaylist: string
} & React.HTMLAttributes<HTMLHeadingElement>;