import { navigate } from '@reach/router';

export const fetcher = (url: string, method: 'POST' | 'GET' | 'PATCH' | 'PUT', body?: any) : Promise<any> => {
    if(!url) return Promise.resolve();

    const token = localStorage.getItem('token') || '';

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || ''
        },
        method: method,
        body: JSON.stringify(body),
        redirect: 'follow'
    })
    .then(res => {
        if(res.status === 401) {
            navigate('/signin');
        }

        return res.status <= 400 
            ? res.json() 
            : { error: res.statusText, status: res.status }
    })
    .then(res => {
        if(res.error) {
            throw res.error;
        } else {
            return res;
        }
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
};