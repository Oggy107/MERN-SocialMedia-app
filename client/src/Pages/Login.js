import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import { LOGIN_USER } from '../graphql/mutations';
import { loginValidation } from '../utils/validation';

import MyForm from '../components/MyForm';

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
        onError: (error) => {
            error.networkError && error.networkError.result.errors.forEach(err => {
                console.error(err.extensions.code, err.message);
            });
        },
        variables: state
    });

    const handleChange = (e, {name, value}) => {
        setState({...state, [name]: value});
    }

    React.useEffect(() => {
        if (context.state.user)
            navigate('/home');
    }, [context.state.user])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loginValidation(clientErrorState, setClientErrorState, initialClientErrorState, state))
            return;

        loginUser();
    }

    return (
        <div className='form-container'>
            <h1>Login</h1>
                <MyForm
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    error={!!serverError}
                    errorContent={serverError && serverError.message}
                    buttonContent="Login"
                    buttonLoading={loading}
                    email={{placeholder: "example@gmail.com", error: clientErrorState.emailError ? clientErrorState.emailError : null}}
                    password={{type: "password", error: clientErrorState.passwordError ? clientErrorState.passwordError : null}}
                />
        </div>
    );
};

export default Login;
