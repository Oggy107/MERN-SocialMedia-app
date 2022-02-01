const { registerUser, loginUser } = require('./user.mutations');
const { createPost, deletePost, likePost, unlikePost, commentPost, uncommentPost } = require('./post.mutations');

const mutations = {
    registerUser,
    loginUser,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    uncommentPost
};

module.exports = mutations;