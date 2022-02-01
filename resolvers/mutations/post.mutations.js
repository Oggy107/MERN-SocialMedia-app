const Post = require('../../models/post');

const createPost = async (parent, args, context, info) => {
    const {_id, username, email} = context.authenticate(context.req.headers.authorization);
    const userPublic = {_id, username, email};
    const { body } = args;

    try {
        return await Post.create({
            body,
            user: userPublic,
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

const likePost = async (parent, args, context, info) => {
    const {_id, username, email} = context.authenticate(context.req.headers.authorization);
    const userPublic = {_id, username, email};

    const { postId } = args;

    const post = await Post.findById(postId);

    if (!post)
        throw new Error('Post not found');

    const like = {
        user: userPublic,
        createdAt: new Date().toISOString()
    };

    if (post.likes.find(like => like.user._id == userPublic._id))
        throw new Error('Already liked');

    post.likes.push(like);

    await post.save();

    return like;
}

const unlikePost = async (parent, args, context, info) => {
    const user = context.authenticate(context.req.headers.authorization);

    const { postId } = args;

    const post = await Post.findById(postId);

    if (!post)
        throw new Error('Post not found');

    const like = post.likes.find(like => like.user._id == user._id);

    if (!like)
        throw new Error('Like not found');

    post.likes.pull(like);
    await post.save();

    return true;
}

const commentPost = async (parent, args, context, info) => {
    const {_id, username, email} = context.authenticate(context.req.headers.authorization);
    const userPublic = {_id, username, email};

    const { postId, body } = args;

    const post = await Post.findById(postId);

    if (!post)
        throw new Error('Post not found');

    const comment = {
        body,
        user: userPublic,
        createdAt: new Date().toISOString()
    };

    post.comments.push(comment);

    await post.save();

    return comment;
}

const uncommentPost = async (parent, args, context, info) => {
    const user = context.authenticate(context.req.headers.authorization);

    const { postId, commentId } = args;

    const post = await Post.findById(postId);

    if (!post)
        throw new Error('Post not found');

    const comment = post.comments.find(comment => (comment._id == commentId && comment.user._id == user._id));

    if (!comment)
        throw new Error('Comment not found');

    post.comments.pull(comment);

    await post.save();

    return true;
}

module.exports =  {
    createPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    uncommentPost
}