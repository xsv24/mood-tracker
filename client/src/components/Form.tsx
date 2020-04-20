import React, { FunctionComponent, FormEvent } from 'react';

type FormPropsType = {
    onSubmit: () => any | void,
    children: React.ReactNode
};

const Form: FunctionComponent<FormPropsType>= ({
    onSubmit,
    children
}) => (
    <form style={{width: '100%'}} onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmit();
    }}>
        {children}
    </form>
);

export default Form;