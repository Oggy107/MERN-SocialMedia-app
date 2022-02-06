import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import { REGISTER_USER } from '../graphql/mutations';
import { registerValidation } from '../utils/validation';

const Register = () => {
    const context = React.useContext(UserContext);
    const navigate = useNavigate();
    const [state, setState] = React.useState({username: '', email: '', password: '', confirmPassword: ''});

    const initialClientErrorState = {usernameError: '', emailError: '', passwordError: '', confirmPasswordError: ''};
    const [clientErrorState, setClientErrorState] = React.useState(initialClientErrorState);

    const [registerUser, { loading, error: serverError }] = useMutation(REGISTER_USER, {
        update: (cache, { data: {registerUser: user} }) => {
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

        if (!registerValidation(clientErrorState, setClientErrorState, initialClientErrorState, state))
            return;

        registerUser();
    }

    return (
        <div className='form-container'>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit} error={serverError ? true : false}>
                <Form.Input 
                    label="User Name"
                    name="username"
                    onChange={handleChange}
                    error={clientErrorState.usernameError ? clientErrorState.usernameError : null}
                />
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
                <Form.Input 
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    error={clientErrorState.confirmPasswordError ? clientErrorState.confirmPasswordError : null}
                />
                <Message error header={serverError && serverError.name} content={serverError && serverError.message} />
                <Form.Button 
                    type="submit"
                    content="Register"
                    loading={loading}
                    primary
                />
            </Form>
        </div>
    );
};

export default Register;
