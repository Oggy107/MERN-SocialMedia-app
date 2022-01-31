const { UserInputError } = require('apollo-server-errors');
const Post = require('../../models/post');

const getPosts = async () => {
    return await Post.find();
}

const getPost = async (parent, args, context, info) => {
    try {
        const post = await Post.findById(args.postId);

        return post;
    } catch (error) {
        throw new UserInputError(error.message)
    }
}

module.exports = {
    getPosts,
    getPost
};