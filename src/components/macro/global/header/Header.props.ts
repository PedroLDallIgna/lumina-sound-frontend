import { ReactNode } from "react"

export type HeaderProps = {
    view: string
    logged: boolean
} & React.HTMLAttributes<HTMLHeadingElement>;
