import React, { FunctionComponent } from 'react';

type RowProps = {
    style?: object,
    className?: string,
    justify?: 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | 'center',
    align?: 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | 'center',
    flex?: number,
    children?: React.ReactNode
}

export const Row: FunctionComponent<RowProps> = ({
    style,
    className,
    justify = 'space-between',
    align = 'center',
    children,
    flex
}) => ( 
    <div 
        className={className}
        style={{
            ...style,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: justify,
            alignItems: align,
            flex: flex
        }} 
    >
        {children}
    </div>
);

export default Row;