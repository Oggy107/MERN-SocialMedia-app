import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import { LOGIN_USER } from '../graphql/mutations';
import { loginValidation } from '../utils/validation';

const Login = () => {
    const context = React.useContext(UserContext);
    const navigate = useNavigate();
    const [state, setState] = React.useState({email: '', password: ''});

    const initialClientErrorState = {emailError: '', passwordError: ''};
    const [clientErrorState, setClientErrorState] = React.useState(initialClientErrorState);

    const [loginUser, { loading, error: serverError }] = useMutation(LOGIN_USER, {
        update: (cache, { data: { loginUser: user}}) => {
            context.login(user);
            navigate('/home');
        },
        variables: state
    });

    const handleChange = (e, {name, value}) => {
        setState({...state, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loginValidation(clientErrorState, setClientErrorState, initialClientErrorState, state))
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
