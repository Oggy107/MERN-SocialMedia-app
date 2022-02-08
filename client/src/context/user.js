import React from 'react';
import { client } from '../ApolloProvider';

import { GET_USER } from '../graphql/queries';

const UserContext = React.createContext({user: null});

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

const UserProvider = (props) => {
    const [state, dispatch] = React.useReducer(userReducer, {user: null});

    const login = (data) => {
        localStorage.setItem('token', data.token);
        dispatch({type: 'LOGIN', payload: data});
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
    }

    if (localStorage.getItem('token') && !state.user)
    {
        const token = localStorage.getItem('token');

        client.query({
            query: GET_USER,
            variables: {
                token
            }
        }).then(({data: {getUser}}) => {
            const user = {...getUser, token};
            login(user);
        }).catch(error => {
            console.error('[ERROR]: ', error);
            logout();
        })
    }

    return (
        <UserContext.Provider value={{state, login, logout}}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };