import { ReactNode, forwardRef } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
    end?: boolean;
    indent?: boolean;
}

export const Paragraph = forwardRef<HTMLParagraphElement, Props>(({ children, className, end, indent = false }, ref) => {
    return (
        <p ref={ref} className={`paragraph${indent ? ' paragraph--indent' : ''}${end ? ' paragraph--end' : ''}${className ? ' ' + className : ''}`}>
            {children}
        </p>
    );
});