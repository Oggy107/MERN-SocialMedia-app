import React from 'react';

if (localStorage.getItem('token'))
{
     
}

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

    return (
        <UserContext.Provider value={{state, login, logout}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};