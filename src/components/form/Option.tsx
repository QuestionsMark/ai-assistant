import { DetailedHTMLProps, OptionHTMLAttributes } from "react";

export const Option = ({ className, children, value, ...rest }: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>) => {
    return (
        <option {...rest} value={value} className={`form__option${className ? ' ' + className : ''}`}>
            {children}
        </option>
    );
};