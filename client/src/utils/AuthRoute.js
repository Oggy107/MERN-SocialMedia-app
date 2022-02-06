import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import { UserContext } from '../context/user';

const AuthRoute = ({ children }) => {
    const { state: userState } = React.useContext(UserContext);

    if (userState.user)
        return Navigate({ to: '/home' });

    return children;
}

export default AuthRoute;