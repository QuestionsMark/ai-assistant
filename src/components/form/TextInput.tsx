import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, Props>(({ className, ...rest }: Props, ref) => {
    return (
        <input
            {...rest}
            ref={ref}
            type="text"
            className={`form__inp${className ? ' ' + className : ''}`}
        />
    );
});