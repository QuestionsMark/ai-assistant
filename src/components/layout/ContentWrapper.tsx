import { ReactNode } from 'react';
// import { usePopup } from '../../contexts/popup.context';
import { usePromises } from '../../contexts/promises.context';
// import { Footer } from './Footer';

interface Props {
    children: ReactNode;
    className?: string;
    // footer?: boolean;
    withAside?: boolean;
}

export const ContentWrapper = ({ children, className, withAside }: Props) => {
    const { loading } = usePromises();
    // const { popup, confirmationPopup } = usePopup();
    // const { element: popupElement, isOpen: isOpenPopup } = popup;
    // const { element: confirmationPopupElement, isOpen: isOpenConfirmationPopup } = confirmationPopup;

    return (
        <div className={`wrapper${loading ? ' blur' : ''}${withAside ? ' wrapper--row' : ''}${className ? ' ' + className : ''}`}>
            {children}
            {/* {footer && <Footer />} */}
            {/* {isOpenPopup && popupElement}
            {isOpenConfirmationPopup && confirmationPopupElement} */}
        </div>
    );
};