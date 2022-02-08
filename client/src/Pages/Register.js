import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import { REGISTER_USER } from '../graphql/mutations';
import { registerValidation } from '../utils/validation';

import MyForm from '../components/MyForm';

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

    React.useEffect(() => {
        if (context.state.user)
            navigate('/home');
    }, [context.state.user])

    return (
        <div className='form-container'>
            <h1>Register</h1>
                <MyForm
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    error={!!serverError}
                    errorContent={serverError && serverError.message}
                    buttonContent="Register"
                    buttonLoading={loading}
                    username={{ label: "User Name", error: clientErrorState.usernameError ? clientErrorState.usernameError : null}}
                    email={{placeholder: "example@gmail.com", error: clientErrorState.emailError ? clientErrorState.emailError : null}}
                    password={{type: "password", error: clientErrorState.passwordError ? clientErrorState.passwordError : null}}
                    confirmPassword={{type: "password", label: "Confirm Password", error: clientErrorState.confirmPasswordError ? clientErrorState.confirmPasswordError : null}}
                />
        </div>
    );
};

export default Register;
