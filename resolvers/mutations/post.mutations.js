const Post = require('../../models/post');

const createPost = async (parent, args, context, info) => {
    const user = context.authenticate(context.req.headers.authorization);

    const { body } = args;

    try {
        return await Post.create({
            body,
            username: user.username,
            userId: user._id,
            comments: [],
            likes: []
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePost = async (parent, args, context, info) => {
    const user = context.authenticate(context.req.headers.authorization);

    const { postId } = args;

    const result = await Post.deleteOne({_id: postId, userId: user._id});

    if (result.deletedCount)
        return true;

    return false;
}

module.exports =  {
    createPost,
    deletePost
}