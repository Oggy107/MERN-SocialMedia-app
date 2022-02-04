import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const REGISTER_USER = gql`
    mutation registerUser($password: String!, $email: String!, $username: String!) {
        registerUser(email: $email, username: $username, password: $password) {
            username,
            email,
            token,
            _id
        }
}
`

const Register = () => {
    const navigate = useNavigate();
    const [state, setState] = React.useState({username: '', email: '', password: '', confirmPassword: ''});

    const initialClientErrorState = {emailError: '', usernameError: '', passwordError: '', confirmPasswordError: ''};
    const [clientErrorState, setClientErrorState] = React.useState(initialClientErrorState);

    const [registerUser, { loading, error: serverError }] = useMutation(REGISTER_USER, {
        update: (cache, { data: {registerUser: user} }) => {
            console.log(user);
            localStorage.setItem('token', user.token);
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

        tempErrorState = state.email === '' ? {...tempErrorState, emailError: "Email is required"} :
            !state.email.match(emailRegEx) ? {...tempErrorState, emailError: "Email is invalid"} :
            {...tempErrorState, emailError: ''};

        tempErrorState = state.username === '' ? {...tempErrorState, usernameError: 'Username is required'} :
            state.username.length < 3 ? {...tempErrorState, usernameError: 'Username must be at least 3 characters'} :
            state.username.length > 10 ? {...tempErrorState, usernameError: 'Username must be less than 10 characters'} :
            {...tempErrorState, usernameError: ''};

        tempErrorState = state.password === '' ? {...tempErrorState, passwordError: 'Password is required'} :
            {...tempErrorState, passwordError: ''};

        tempErrorState = state.confirmPassword === '' ? {...tempErrorState, confirmPasswordError: 'Confirm Password is required'} :
            state.confirmPassword !== state.password ? {...tempErrorState, confirmPasswordError: 'Passwords do not match'} :
            {...tempErrorState, confirmPasswordError: ''};

        setClientErrorState(tempErrorState);

        if (JSON.stringify(tempErrorState) === JSON.stringify(initialClientErrorState))
            return true;

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
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
