import { PulseLoader } from 'react-spinners';

export const LoadingScreen = () => {
    return (
        <div className="popup__loading-layout">
            <PulseLoader className="popup__loading-spinner" color="#45a9df" />
        </div>
    );
};