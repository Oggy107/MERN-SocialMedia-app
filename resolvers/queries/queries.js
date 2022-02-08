const { getPosts, getPost } = require('./post.queries');
const { getUser } = require('./user.queries');

const queries = {
    getPosts,
    getPost,
    getUser
}

module.exports = queries;