import { ReactNode } from "react"

export type CardAlbumProps = {
  url: string
  nomeAlbum: string
} & React.HTMLAttributes<HTMLHeadingElement>;