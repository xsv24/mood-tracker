import React from 'react';
import { classes } from '../../utils';
import './chip.scss';

export const Chip = ({
    children,
    selected = false,
    onClick = () => {}
}) => (
    <button 
        type='button' 
        className={classes('chip', selected && 'selected')}
        onClick={onClick}
    >
        <img src='/images/tick.svg' alt='ticked' />
        
        {children}
    </button>
);

export default Chip;
