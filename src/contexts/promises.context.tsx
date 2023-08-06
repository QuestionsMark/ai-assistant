import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingScreen } from "../components/popups/LoadingScreen";
import { ResponseToast } from "../components/common/ResponseToast";

interface Props {
    children: ReactNode;
}

interface PromisesContextValue {
    loading: boolean;
    error: ReactNode | null;
    message: ReactNode | null;
    setLoading: (isLoading: boolean) => void;
    setError: (error: ReactNode | null) => void;
    setMessage: (message: ReactNode | null) => void;
}

const defaultPromisesContextValue: PromisesContextValue = {
    error: null,
    loading: false,
    message: null,
    setError: undefined!,
    setLoading: undefined!,
    setMessage: undefined!,
};

export const PromisesContext = createContext<PromisesContextValue>(defaultPromisesContextValue);

export const usePromises = () => useContext(PromisesContext);

export const PromisesProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ReactNode | null>(null);
    const [message, setMessage] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (error && !loading) toast(<ResponseToast content={error} type="error" />);
        if (message && !loading) toast(<ResponseToast content={message} type="success" />);
        setError(null);
        setMessage(null);
    }, [error, loading, message]);

    return (
        <PromisesContext.Provider value={{
            error,
            loading,
            message,
            setError,
            setLoading,
            setMessage,
        }}>
            {children}
            {loading && <LoadingScreen />}
        </PromisesContext.Provider>
    );
};