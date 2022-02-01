const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-errors');

const authenticate = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new AuthenticationError("No token provided");

    const token = authHeader.split(' ')[1];

    if (!token)
        throw new AuthenticationError("No token provided");

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    } catch (error) {
        throw new AuthenticationError(error.message);
    }
}

module.exports = authenticate;