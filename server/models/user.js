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
        minlength: 5,
        maxlength: 20
    }
}, {timestamps: true});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.genJWT = function() {
    try {
        return jwt.sign({_id: this._id, username: this.username, email: this.email}, process.env.JWT_SECRET, {expiresIn: '10 days'});
    } catch (error) {
        throw new UserInputError(error.message);
    }
}

userSchema.methods.verify = function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;