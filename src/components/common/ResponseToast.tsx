import { ReactNode } from "react";

interface Props {
    title?: string;
    content: string | ReactNode;
    type: 'error' | 'success';
}

export const ResponseToast = ({ content, type, title }: Props) => {
    return (
        <div className={`toast__container toast__container--${type}`}>
            {title && <h2 className="toast__title">{title}</h2>}
            {typeof content === 'string' ? <p className="toast__content">
                {content}
            </p> : content}
        </div>
    );
};