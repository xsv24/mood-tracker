import React, { FunctionComponent } from 'react';
import { classes } from '../utils';

type LabelProps = {
    for?: string,
    style?: object,
    className?: string,
    color?: 'danger' | 'info' | 'warn' | 'success',
    children: React.ReactNode,
}

export const Label: FunctionComponent<LabelProps> = ({
    className,
    color,
    style,
    children
}) => (
    <label className={classes(className, color)} style={style}>
        {children}
    </label>
);

export default Label;