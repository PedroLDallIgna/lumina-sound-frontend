import { ReactNode } from "react"

export type CardArtistProps = {
  id: string
  url: string
  path: string
  artista: string
} & React.HTMLAttributes<HTMLHeadingElement>;