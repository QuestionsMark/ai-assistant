import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    gap?: string;
}

export const Row = ({ children, className, gap, ...rest }: Props) => {
    return (
        <div {...rest} className={`row${className ? ' ' + className : ''}`} style={{ gap }}>
            {children}
        </div>
    );
};