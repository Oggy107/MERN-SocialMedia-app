const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'must be provided']
    },
    user: {
        username: String,
        email: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    comments: [
        {
            body: String,
            user: {
                username: String,
                email: String,
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                }
            },
            createdAt: String,
        }
    ],
    likes: [
        {
            user: {
                username: String,
                email: String,
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                }
            },
            createdAt: String
        }
    ],
    user: {
        username: String,
        email: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
}, {timestamps: true})

const Post = mongoose.model('post', postSchema);

module.exports = Post