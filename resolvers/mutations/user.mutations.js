const User = require('../../models/user');
const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const registerUser = async (parent, args, context, info) => {
    const { username, email, password } = args;

    try {
        const user = await User.create({username, email, password});
        const token = user.genJWT();

        return {_id: user._id, username: user.username, email: user.email, token};
    } catch (error) {
        throw new UserInputError(error.message);
    }
}

const loginUser = async (parent, args, context, info) => {
    const { email, password } = args;

    const user = await User.findOne({email: email});

    if (!user)
        throw new AuthenticationError("Invalid Credentials");

    const result = await user.verify(password);

    if (!result)
        throw new AuthenticationError("Invalid Credentials");

    const token = user.genJWT();
    return {_id: user._id, username: user.username, email: user.email, token};
}

module.exports = {
    registerUser,
    loginUser
};