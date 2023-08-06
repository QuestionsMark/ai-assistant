import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const Textarea = ({ className, name, ...rest }: Props) => {
    return (
        <textarea
            {...rest}
            name={name}
            className={`form__inp form__textarea${className ? ' ' + className : ''}`}
        />
    );
};