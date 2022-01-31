const User = require('../../models/user');

const registerUser = (parent, args, context, info) => {
    return User.register(args.username, args.email, args.password);
}

const loginUser = (parent, args, context, info) => {
    return User.login(args.email, args.password);
}

module.exports = {
    registerUser,
    loginUser
};