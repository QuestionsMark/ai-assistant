import { useEffect, useState } from "react";
import { fetchTool, minimalDelayFunction } from "../utils/api.util";
import { usePromises } from "../contexts/promises.context";

interface Value<T> {
    data: T | null;
    error: string | null;
    refresh(): void;
}

export function useDelayAPI<T>(path: string, reset = false): Value<T> {
    const { setError: setErrorPromises, setLoading } = usePromises();
    const [reload, setReload] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    const refresh = () => {
        setReload(state => !state);
    };

    useEffect(() => {
        (async () => {
            if (reset) {
                setData(null);
            }
            setError(null);
            setLoading(true);
            const { delayTime, response } = await minimalDelayFunction<T>(() => fetchTool(path));
            setTimeout(() => {
                setLoading(false);
                setTimeout(() => {
                    if (!response.status) {
                        setErrorPromises(response.message);
                        setError(response.message);
                        return;
                    }
                    setData(response.results);
                });
            }, delayTime);
        })();
    }, [path, reload]);

    return {
        data,
        error,
        refresh,
    };
};