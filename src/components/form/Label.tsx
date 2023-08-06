import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";

interface Props extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    children: ReactNode;
    title?: string;
    titleClassName?: string;
    value?: ReactNode;
    onClick?: () => void;
}

export const Label = ({ children, value, className, title, titleClassName, onClick, ...rest }: Props) => {
    return (
        <label {...rest} className={`form__label${className ? ' ' + className : ''}`} onClick={onClick}>
            {title && <h3 className={`form__title${titleClassName ? ' ' + titleClassName : ''}`}>{title}</h3>}
            {children}
            {value}
        </label>
    );
};