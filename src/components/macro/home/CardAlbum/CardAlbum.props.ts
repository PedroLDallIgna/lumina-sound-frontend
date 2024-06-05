import { ReactNode } from "react"

export type CardAlbumProps = {
  url: string | null
  nomeAlbum: string
} & React.HTMLAttributes<HTMLHeadingElement>;