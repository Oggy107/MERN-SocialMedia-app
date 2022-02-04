import React from 'react';

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

const userProvider = (props) => {
    const [state, dispatch] = React.useReducer(userReducer, {user: null});

    const login = (data) => {
        dispatch({type: 'LOGIN', payload: data});
    }

    const logout = () => {
        dispatch({type: 'LOGOUT'});
    }

    return (
        <UserContext.Provider value={{state, login, logout}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, userProvider};