import { ReactNode } from "react";

export type ParagraphProps = {
    name: "textoPessoa" | "teste";
    children: ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;
