import React from "react";

export type InputProps = {
    classe: "pesquisa" | "inputForm" | "linkCadastro"
    type: string
    campo: string
    id: string
} & React.InputHTMLAttributes<HTMLInputElement>;
