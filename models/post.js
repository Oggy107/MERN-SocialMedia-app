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

postSchema.statics.createPost = async function(body, username, userId) {
    try {
        return await this.create({
            body,
            username,
            userId,
            comments: [],
            likes: []
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

postSchema.statics.deletePost = async function(postId) {
    try {
        return await this.deleteOne({_id: postId});
        return await this.findByIdAndDelete(postId);
    } catch (error) {
        throw new Error(error.message);
    }
}

const Post = mongoose.model('post', postSchema);

module.exports = Post