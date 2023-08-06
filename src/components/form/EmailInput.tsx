import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const EmailInput = ({ className, placeholder, ...rest }: Props) => {
    return (
        <input
            {...rest}
            type="email"
            className={`form__inp${className ? ' ' + className : ''}`}
            placeholder={placeholder ? placeholder : 'e-mail'}
        />
    );
};