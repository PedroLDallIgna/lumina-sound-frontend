import { ReactNode } from "react"

export type LinkProps = {
    classe: "linkNav"
    children: ReactNode
    url: string
} & React.HTMLAttributes<HTMLHeadingElement>;
