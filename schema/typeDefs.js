const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        token: String!
    }

    type Comment {
        body: String,
        username: String,
        createdAt: String
    }

    type Like {
        username: String,
        createdAt: String
    }

    type Post {
        body: String,
        username: String,
        comments: [Comment],
        likes: [Like],
        _id: ID,
        userId: ID
    }

    type Query {
        getPosts: [Post],
        getPost(postId: ID!): Post
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): User
        createPost(body: String!): Post,
        deletePost(postId: ID!): Boolean
    }
`;

module.exports = typeDefs;