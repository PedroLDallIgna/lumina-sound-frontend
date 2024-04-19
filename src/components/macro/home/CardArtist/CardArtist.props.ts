import { ReactNode } from "react"

export type CardArtistProps = {
  url: string
  artista: string
} & React.HTMLAttributes<HTMLHeadingElement>;