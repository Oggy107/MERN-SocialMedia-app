const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-errors');

const getUser = (parent, args, context, info) => {
    const token = args.token;

    if (!token)
        throw new UserInputError("No token provided");

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getUser
};