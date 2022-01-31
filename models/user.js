const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'must be provided'],
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: [true, 'must be provided'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'invalid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'must be provided'],
    }
}, {timestamps: true});

const genJWT = async function(id, username, email) {
    try {
        return jwt.sign({id, username, email}, process.env.JWT_SECRET);
    } catch (error) {
        throw new UserInputError(error.message);
    }
}

userSchema.statics.register = async function(username, email, password) {
    try {
        password = await bcrypt.hash(password, 10);
        const user = await this.create({username, email, password});
        const token = genJWT(user._id, user.username, user.email);
        console.log(user);
        return {id: user._id, username: user.username, email: user.email, token};
    } catch (error) {
        throw new UserInputError(error.message);
    }
}

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email: email});

    if (!user)
        throw new AuthenticationError("Invalid Credentials");

    const result = await bcrypt.compare(password, user.password);

    if (!result)
        throw new AuthenticationError("Invalid Credentials");

    const token = genJWT(user._id, user.username, email);
    return {id: user._id, username: user.username, email, token};
}

const User = mongoose.model('user', userSchema);

module.exports = User;