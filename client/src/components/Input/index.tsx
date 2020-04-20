import React, { FunctionComponent } from 'react';
import { classes } from '../../utils';
import './input.scss';

type InputProps = {
    value: string,
    name: string,
    type?: string,
    onChange: Function,
    defaultValue?: string,
    placeholder?: string,
    className?: string,
    label?: string,
    error?: string
};

export const Input: FunctionComponent<InputProps> = ({
    defaultValue,
    onChange,
    className,
    error,
    placeholder,
    type = 'text',
    name,
    label,
    value
}) => (
    <input
        type={type}
        name={name} 
        className={classes(className, error && 'danger')} 
        defaultValue={defaultValue}
        placeholder={placeholder || label}
        onChange={e => onChange(e.target.value, e)}
        value={value} 
    />
);

export default Input;