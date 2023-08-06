import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const NumberInput = ({ className, name, ...rest }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <div className={`form__inp-container${className ? ' ' + className : ''}`}>
            <div className="form__inp-content">
                {name && <p className="form__inp-name">{name} &bull;</p>}
                <input
                    {...rest}
                    type="number"
                    className="form__inp"
                />
            </div>
        </div>
    );
};