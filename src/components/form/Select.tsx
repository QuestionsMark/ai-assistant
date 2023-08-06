import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export const Select = ({ name, children, className, ...rest }: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) => {
    return (
        <div className={`form__inp-container${className ? ' ' + className : ''}`}>
            <div className="form__inp-content">
                {name && <p className="form__inp-name">{name} &bull;</p>}
                <select {...rest} className="form__inp form__select">
                    {children}
                </select>
            </div>
        </div>
    );
};