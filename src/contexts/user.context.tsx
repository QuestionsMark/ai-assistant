import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../types";
import { fetchTool, minimalDelayFunction } from "../utils/api.util";
import { usePromises } from "./promises.context";

interface UserContextValue {
    user: User.Response | null;
    setUser: Dispatch<SetStateAction<User.Response | null>>;
}

interface Props {
    children: ReactNode;
}

export const safePaths: string[] = [
    '',
    'signup',
    'login',
    'password-reset',
    'account-activate',
];
const checkRedirect = (pathname: string): boolean => {
    const actualPath = pathname.split('/')[1];
    return !safePaths.includes(actualPath);
};

const UserContext = createContext<UserContextValue>(null!);

export const useUser = () => useContext(UserContext);

export const useUserInfo = () => {
    const { user } = useContext(UserContext);
    return user as User.Response;
};

export const UserProvider = ({ children }: Props) => {
    const { setLoading } = usePromises();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [user, setUser] = useState<User.Response | null>(null);

    useEffect(() => {
        if (user !== null) return;
        setLoading(true);
        (async () => {
            const { delayTime, response } = await minimalDelayFunction<User.Response>(() => fetchTool('auth/is-logged'));
            setTimeout(() => {
                setLoading(false);
                if (!response.status) {
                    if (checkRedirect(pathname)) return navigate('/');
                    return;
                }
                setUser(response.results);
            }, delayTime);
        })()
    }, [user]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};