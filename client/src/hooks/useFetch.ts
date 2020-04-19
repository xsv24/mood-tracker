import { useState } from 'react';

import { fetcher } from '../api'
import useMount from '../hooks/useMount';

type UseFetchReturn = [ any, boolean, (url?: string, body?: object) => Promise<any> ];

type UseFetchProps = {
    url?: string,
    method?: 'POST' | 'GET' | 'PATCH' | 'PUT',
    body?: object, 
    opts?: object,
    defaultValue?: any,
    done?: (res?: any) => void,
    onMount?: boolean
};

const useFetch = ({
    url = '',
    body,
    method = 'GET',
    defaultValue = {},
    onMount = false
}: UseFetchProps) : UseFetchReturn => {

    const [ res, setRes ] = useState<object>(defaultValue);
    const [ loading, setLoading ] = useState<boolean>(false);

    function load(endPoint?: string, body?: object) : Promise<any> {
        if(loading) return Promise.resolve();

        setLoading(true);

        return fetcher(endPoint || url, method, body)
            .then(res => {
                setRes(res);
                return res;
            })
            .catch(err => {
                defaultValue.error = err;
                setRes(defaultValue);
                return err;
            })
            .finally(() => setLoading(false));
    }

    useMount(() => {
        let canceled = false;

        if(onMount && !loading && !canceled) {
            setLoading(true);

            fetcher(url, method, body)
                .then(res => {
                    !canceled && setRes(res);   
                })
                .catch(err => {
                    defaultValue.error = err;
                    !canceled && setRes(defaultValue);
                })
                .finally(() => { 
                    !canceled && setLoading(false)
                });
        }
        
        return () => { canceled = true; };
    });
    
    return [res, loading, load ];
};

export default useFetch;