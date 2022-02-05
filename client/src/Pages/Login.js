import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
        username
        _id
        email
        token
    }
}
`

const Login = () => {
    const { login } = React.useContext(UserContext);
    const navigate = useNavigate();
    const [state, setState] = React.useState({email: '', password: ''});

    const initialClientErrorState = {emailError: '', passwordError: ''};
    const [clientErrorState, setClientErrorState] = React.useState(initialClientErrorState);

    const [loginUser, { loading, error: serverError }] = useMutation(LOGIN_USER, {
        update: (cache, { data: { loginUser: user}}) => {
            login(user);
            navigate('/home');
        },
        variables: state
    });

    const handleChange = (e, {name, value}) => {
        setState({...state, [name]: value});
    }

    const validate = () => {
        let tempErrorState = {...clientErrorState};
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        tempErrorState = state.password === '' ? {...tempErrorState, passwordError: 'Password is required'} :
        {...tempErrorState, passwordError: ''};

        tempErrorState = state.email === '' ? {...tempErrorState, emailError: "Email is required"} :
            !state.email.match(emailRegEx) ? {...tempErrorState, emailError: "Email is invalid"} :
            {...tempErrorState, emailError: ''};
            
        setClientErrorState(tempErrorState);

        if (JSON.stringify(tempErrorState) === JSON.stringify(initialClientErrorState))
            return true;

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        loginUser();
    }

    return (
        <div className='form-container'>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} error={serverError ? true : false}>
                <Form.Input 
                    label="Email"
                    placeholder="example@gmail.com"
                    name="email"
                    onChange={handleChange}
                    error={clientErrorState.emailError ? clientErrorState.emailError : null}
                />
                <Form.Input 
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    error={clientErrorState.passwordError ? clientErrorState.passwordError : null}
                />
                <Message error header={serverError && serverError.name} content={serverError && serverError.message} />
                <Form.Button 
                    type="submit"
                    content="Login"
                    loading={loading}
                    primary
                />
            </Form>
        </div>
    );
};

export default Login;
