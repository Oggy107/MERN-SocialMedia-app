const queries = require('./queries/queries');
const mutations = require('./mutations/mutations');

const resolvers = {
    Query: queries,
    Mutation: mutations
}

module.exports = resolvers;