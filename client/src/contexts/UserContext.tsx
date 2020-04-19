import React from 'react';

export type UserType = {
    user: string,
    email?: string,
    token?: string,
    setUser: (updatedUser: UserType) => void
};

const UserContext = React.createContext<UserType>({
    user: '',
    email: '',
    token: '',
    setUser: (updatedUser: UserType) => undefined
});

export default UserContext;