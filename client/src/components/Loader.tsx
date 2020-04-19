import React, { FunctionComponent, useState, useEffect } from 'react';
import { classes } from '../utils';

type LoaderProps = {
    loading: boolean,
    children?: React.ReactNode,
    delay?: number
};

export const Loader: FunctionComponent<LoaderProps> = ({
    loading,
    children,
    delay = 500
}) => {
    const [ loaded, setLoaded ] = useState(loading);

    useEffect(() => {
        if(loading) {
            setLoaded(false);
        }

        if(!loading) {
            const delayer = setTimeout(() => {
                setLoaded(true);
            }, delay);
            
            return () => clearTimeout(delayer);
        }

    }, [ delay, loading, setLoaded ])

    return !loaded
        ? <div className={classes('fill', 'center', 'loader')} /> 
        : <>{children}</>
};

export default Loader;