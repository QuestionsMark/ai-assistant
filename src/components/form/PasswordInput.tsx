import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Button } from '../common/Button';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const PasswordInput = ({ className, placeholder, ...rest }: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={`form__inp-container${className ? ' ' + className : ''}`}>
            <input
                {...rest}
                type={visible ? "text" : "password"}
                className="form__inp form__inp-password"
                placeholder={placeholder ? placeholder : 'password'}
            />
            <Button type="button" className="btn--nostyles form__inp-password-btn">
                {visible ? <AiFillEye className="form__inp-password-icon" onClick={() => setVisible(false)} /> : <AiFillEyeInvisible className="form__inp-password-icon" onClick={() => setVisible(true)} />}
            </Button>
        </div>
    );
};