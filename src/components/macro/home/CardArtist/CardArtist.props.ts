import { ReactNode } from "react"

export type CardArtistProps = {
  id: number | string | null
  url: string
  //path: string
  artista: string
} & React.HTMLAttributes<HTMLHeadingElement>;