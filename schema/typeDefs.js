const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        token: String!
    }

    type UserPublic {
        _id: ID!
        username: String!
        email: String!
    }

    type Comment {
        body: String!,
        createdAt: String!,
        _id: ID,
        user: UserPublic!
    }

    type Like {
        createdAt: String
        user: UserPublic,
    }

    type Post {
        body: String,
        comments: [Comment],
        likes: [Like],
        _id: ID,
        user: UserPublic
    }

    type Query {
        getPosts: [Post],
        getPost(postId: ID!): Post
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!): User!
        loginUser(email: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): Boolean!
        likePost(postId: ID!): Like!
        unlikePost(postId: ID!): Boolean!
        commentPost(postId: ID!, body: String!): Comment!
        uncommentPost(postId: ID!, commentId: ID!): Boolean!
    }
`;

module.exports = typeDefs;