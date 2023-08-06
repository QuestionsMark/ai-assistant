import { forwardRef, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export const List = forwardRef<HTMLUListElement, Props>(({ children, className }, ref) => {
    return (
        <ul ref={ref} className={`list${className ? ' ' + className : ''}`}>
            {children}
        </ul>
    );
});