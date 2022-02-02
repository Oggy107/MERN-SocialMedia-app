import React from 'react';
import {Form, Container} from 'semantic-ui-react';

const Login = () => {
    const [state, setState] = React.useState({email: '', password: ''});

    const initialErrorState = {emailError: '', passwordError: ''};
    const [errorState, setErrorState] = React.useState(initialErrorState);

    const handleChange = (e, {name, value}) => {
        setState({...state, [name]: value});
    }

    const validate = () => {
        let tempErrorState = {...errorState};
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        tempErrorState = state.password === '' ? {...tempErrorState, passwordError: 'Password is required'} :
        {...tempErrorState, passwordError: ''};

        tempErrorState = state.email === '' ? {...tempErrorState, emailError: "Email is required"} :
            !state.email.match(emailRegEx) ? {...tempErrorState, emailError: "Email is invalid"} :
            {...tempErrorState, emailError: ''};

        setErrorState(tempErrorState);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        validate();

        if (!(JSON.stringify(errorState) === JSON.stringify(initialErrorState)))
            return;

        //  console.log(state);
    }

    React.useEffect(() => {
        console.log(errorState);
    }, [errorState])

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Input 
                    label="Email"
                    placeholder="example@gmail.com"
                    name="email"
                    onChange={handleChange}
                    error={errorState.emailError ? errorState.emailError : null}
                />
                <Form.Input 
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    error={errorState.passwordError ? errorState.passwordError : null}
                />
                <Form.Button 
                    type="submit"
                    content="Login"
                />
            </Form>
        </Container>
    );
};

export default Login;
