import { ReactNode } from "react"

export type LinkProps = {
    classe: "linkNav" | "btnLogin" | "btnBanner" | "linkCadastro" | "linkCard"
    children: ReactNode
    url: string
} & React.HTMLAttributes<HTMLHeadingElement>;
