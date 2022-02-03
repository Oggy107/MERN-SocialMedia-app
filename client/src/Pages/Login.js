import React from 'react';
import { Form, Container, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
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
    const [state, setState] = React.useState({email: '', password: ''});
    const [loginUser, { data, loading, error }] = useMutation(LOGIN);

    const initialClientErrorState = {emailError: '', passwordError: ''};
    const [clientErrorState, setClientErrorState] = React.useState(initialClientErrorState);
    const [serverErrorState, setServerErrorState] = React.useState('');

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
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        validate();

        if (!(JSON.stringify(clientErrorState) === JSON.stringify(initialClientErrorState)))
            return;

        loginUser({
            variables: {
                email: state.email,
                password: state.password
            }
        }).then(({data: {loginUser: user}}) => {
            console.log(user);
            setServerErrorState('');
            localStorage.setItem('token', user.token);
        }).catch(error => {
            setServerErrorState(error.message);
            console.error('[ERROR]: ', error);
        });
    }

    // React.useEffect(() => {
    //     console.log(serverErrorState);
    // }, [serverErrorState])

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} error={serverErrorState ? true : false}>
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
                <Message error header='Error' content={serverErrorState} />
                <Form.Button 
                    type="submit"
                    content="Login"
                    loading={loading}
                    primary
                />
            </Form>
        </Container>
    );
};

export default Login;
