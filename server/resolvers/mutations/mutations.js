const { registerUser, loginUser } = require('./user.mutations');
const { createPost, deletePost, likePost, commentPost, uncommentPost } = require('./post.mutations');

const mutations = {
    registerUser,
    loginUser,
    createPost,
    deletePost,
    likePost,
    commentPost,
    uncommentPost
};

module.exports = mutations;