import { ReactNode } from "react"

export type CardMusicProps = {
  url: string
  artista: string[]
  nomeMusica: string
} & React.HTMLAttributes<HTMLHeadingElement>;