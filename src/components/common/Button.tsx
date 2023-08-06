import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, MouseEvent, ReactNode } from "react";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, onClick, type = 'submit', ...rest }, ref) => {
    const handleClick = (e: MouseEvent) => {
        if (e.currentTarget.getAttribute("type") === 'submit') return;
        e.preventDefault();
        if (typeof onClick === 'function') {
            onClick();
        }
    };

    return (
        <button
            {...rest}
            ref={ref}
            type={type}
            className={`btn${className ? ' ' + className : ''}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
});