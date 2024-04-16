//import { ReactNode } from "react"

export type InputProps = {
    classe: "pesquisa" | "inputForm" | "linkCadastro"
    type: string
    campo: string
} & React.HTMLAttributes<HTMLHeadingElement>;
