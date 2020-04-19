import React, { FunctionComponent } from 'react';

type InputProps = {
    value: string,
    name: string,
    type?: string
    onChange: Function,
    defaultValue?: string,
    placeholder?: string,
    className?: string,
    label?: string
}

export const Input: FunctionComponent<InputProps> = ({
    defaultValue,
    onChange,
    className,
    placeholder,
    type = 'text',
    name,
    label,
    value
}) => (
    <input
        type={type}
        name={name} 
        className={className} 
        defaultValue={defaultValue}
        placeholder={placeholder || label}
        onChange={e => onChange(e.target.value, e)}
        value={value} 
    />
);

export default Input;