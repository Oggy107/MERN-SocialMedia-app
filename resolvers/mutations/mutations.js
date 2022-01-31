const { registerUser, loginUser } = require('./user.mutations');
const { createPost, deletePost } = require('./post.mutations');

const mutations = {
    registerUser,
    loginUser,
    createPost,
    deletePost
};

module.exports = mutations;