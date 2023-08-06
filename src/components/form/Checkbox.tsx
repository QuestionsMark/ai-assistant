import { RiCheckboxBlankLine } from 'react-icons/ri';
import { GiCheckMark } from 'react-icons/gi';

interface Props {
    checked: boolean;
    className?: string;
}

export const Checkbox = ({ checked, className }: Props) => {
    return (
        <div className={`form__checkbox${className ? ' ' + className : ''}`}>
            <RiCheckboxBlankLine className="form__checkbox-box" />
            {checked && <GiCheckMark className="form__checkbox-mark" />}
        </div>
    );
};