import React from 'react';

import { classes } from '../../utils';
import './container.scss';

export const Container = ({
    children,
    main = false,
    className = ''
}) => (
    <div className={classes('container', main && 'main', className)}>
        {children}
    </div>
);

export default Container;