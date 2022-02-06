const emailValidation = (tempErrorState, state) => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    tempErrorState = state.email === '' ? {...tempErrorState, emailError: "Email is required"} :
    !state.email.match(emailRegEx) ? {...tempErrorState, emailError: "Email is invalid"} :
    {...tempErrorState, emailError: ''};

    return tempErrorState;
}

const passwordValidation = (tempErrorState, state) => {
    tempErrorState = state.password === '' ? {...tempErrorState, passwordError: 'Password is required'} :
    state.password.length < 5 ? {...tempErrorState, passwordError: 'Password must be at least 5 characters'} :
    state.password.length > 20 ? {...tempErrorState, passwordError: 'Password must be less than 20 characters'} :
    {...tempErrorState, passwordError: ''};

    return tempErrorState;
}

const registerValidation = (clientErrorState, setClientErrorState, initialClientErrorState, state) => {
    let tempErrorState = {...clientErrorState};

    tempErrorState = state.username === '' ? {...tempErrorState, usernameError: 'Username is required'} :
    state.username.length < 3 ? {...tempErrorState, usernameError: 'Username must be at least 3 characters'} :
    state.username.length > 10 ? {...tempErrorState, usernameError: 'Username must be less than 10 characters'} :
    {...tempErrorState, usernameError: ''};

    tempErrorState = emailValidation(tempErrorState, state);
    tempErrorState = passwordValidation(tempErrorState, state);

    tempErrorState = state.confirmPassword === '' ? {...tempErrorState, confirmPasswordError: 'Confirm Password is required'} :
    state.confirmPassword !== state.password ? {...tempErrorState, confirmPasswordError: 'Passwords do not match'} :
    {...tempErrorState, confirmPasswordError: ''};

    setClientErrorState(tempErrorState);

    if (JSON.stringify(tempErrorState) === JSON.stringify(initialClientErrorState))
        return true;

    return false;
};

const loginValidation = (clientErrorState, setClientErrorState, initialClientErrorState, state) => {
    let tempErrorState = {...clientErrorState};

    tempErrorState = passwordValidation(tempErrorState, state);
    tempErrorState = emailValidation(tempErrorState, state);

    setClientErrorState(tempErrorState);

    if (JSON.stringify(tempErrorState) === JSON.stringify(initialClientErrorState))
        return true;

    return false;
};

export { registerValidation, loginValidation };