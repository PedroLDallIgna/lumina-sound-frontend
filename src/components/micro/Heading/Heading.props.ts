import { ReactNode } from "react";

export type HeadingProps = {
    level: number;
    children: ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;
