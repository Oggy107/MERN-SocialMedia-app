const Post = require('../../models/post');

const createPost = async (parent, args, context, info) => {
    const user = context.authenticate(context.req.headers.authorization);

    return await Post.createPost(args.body, user.username, user.id);
}

const deletePost = async (parent, args, context, info) => {
    const user = context.authenticate(context.req.headers.authorization);

    const result = await Post.deletePost(args.postId);

    if (result.deletedCount)
        return true;

    return false;
}

module.exports =  {
    createPost,
    deletePost
}