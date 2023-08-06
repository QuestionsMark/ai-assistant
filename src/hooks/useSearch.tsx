import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import axios, { Canceler, AxiosError } from 'axios';
import { usePromises } from '../contexts/promises.context';
import { HOST_ADDRESS } from '../../config/config';

export interface Queries {

}

const defaultQueries: Queries = {};

export interface SearchResult<T> {
    data: T[];
    loading: boolean;
    hasMore: boolean;
    amount: number;
    page: number;
    searchPhrase: string;
    handleSearchPhraseChange: (value: string) => void;
    setPage: Dispatch<SetStateAction<number>>;
    refresh: () => void;
}

export function useSearch<T>(
    collection: string,
    limit: number,
    queries: Queries = defaultQueries,
): SearchResult<T> {
    const { setError } = usePromises();

    const debounceTimeoutId = useRef<number | null>(null);
    const delayTimeoutId = useRef<number | null>(null);

    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [search, setSearch] = useState('');
    const handleSearchPhraseChange = (text: string) => {
        setSearchPhrase(text);
    };

    const refresh = () => {
        setReload(state => !state);
        setPage(1);
    };

    useEffect(() => {
        setData([]);
    }, [reload, search, queries]);

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setPage(1);
            setSearch(searchPhrase);
        }, 500);
    }, [searchPhrase]);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        const startTime = new Date().valueOf();
        if (delayTimeoutId.current) {
            clearTimeout(delayTimeoutId.current);
        }
        let cancel: Canceler;
        setLoading(true);
        axios({
            method: 'GET',
            url: `${HOST_ADDRESS}/${collection}`,
            params: {
                search: search,
                page,
                limit,
                ...queries,
            },
            cancelToken: new axios.CancelToken(c => cancel = c),
            withCredentials: true,
        })
            .then(res => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    setLoading(false);
                    setAmount(res.data.count);
                    setData(prev => [...prev, ...res.data.results]);
                    setHasMore(res.data.results.length > 0);
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            })
            .catch((e: AxiosError) => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    if (axios.isCancel(e)) return;
                    const errorObject = (e as AxiosError).toJSON() as { status: number };
                    if (errorObject.status === 403) {
                        // Logout client
                        return;
                    }
                    if (axios.isCancel(e)) return;
                    setError('There was an error while fetching data.');
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            });

        return () => {
            if (delayTimeoutId.current) {
                clearTimeout(delayTimeoutId.current);
            }
            cancel();
        }

    }, [search, page, collection, reload, queries]);

    return { loading, data, hasMore, amount, page, searchPhrase, setPage, handleSearchPhraseChange, refresh };
}