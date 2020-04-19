import React, { FunctionComponent } from 'react';

type ColProps = {
    style?: object,
    className?: string,
    flex?: number,
    justify?: 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | 'center',
    align?: 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | 'center',
    children: React.ReactNode
}

export const Col: FunctionComponent<ColProps> = ({
    style,
    className,
    justify = 'space-between',
    align = 'center',
    flex,
    children
}) => ( 
    <div 
        className={className}
        style={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: justify,
            alignItems: align,
            flex: flex
        }} 
    >
        {children}
    </div>
);

export default Col;