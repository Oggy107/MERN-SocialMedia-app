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
        _id: ID!,
        user: UserPublic!
    }

    type Like {
        createdAt: String!
        user: UserPublic!,
    }

    type Post {
        body: String!,
        comments: [Comment]!,
        likes: [Like]!,
        _id: ID!,
        user: UserPublic!,
        createdAt: String!,
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
        likePost(postId: ID!): Post!
        commentPost(postId: ID!, body: String!): Post!
        uncommentPost(postId: ID!, commentId: ID!): Post!
    }
`;

module.exports = typeDefs;