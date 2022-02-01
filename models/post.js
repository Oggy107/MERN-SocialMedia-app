const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'must be provided']
    },
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true})

const Post = mongoose.model('post', postSchema);

module.exports = Post