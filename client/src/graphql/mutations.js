import { gql } from '@apollo/client';

const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        username
        _id
        email
        token
    }
}
`

const REGISTER_USER = gql`
mutation registerUser($password: String!, $email: String!, $username: String!) {
    registerUser(email: $email, username: $username, password: $password) {
        username,
        email,
        token,
        _id
    }
}
`

const CREATE_POST = gql`
mutation createPost($body: String!) {
    createPost(body: $body) {
        body
        comments {
            body,
            createdAt,
            user {
                _id
                email
                username
            },
        }
        likes {
            user {
                _id
                email
                username
            },
            createdAt
        }
        user {
            _id
            email
            username
        }
        _id
        createdAt
    }
}
`

const DELETE_POST = gql`
mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
}
`

const LIKE_POST = gql`
mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
        _id
        likes {
            user {
                _id
                email
                username
            },
            createdAt
        }
    }
}
`

const COMMENT_POST = gql`
mutation commentPost($postId: ID!, $body: String!) {
    commentPost(postId: $postId, body: $body) {
        _id
        comments {
            body
            createdAt
            user {
                _id
                email
                username
            }
            _id
        }
    }
}
`

const UNCOMMENT_POST = gql`
mutation uncommentPost($postId: ID!, $commentId: ID!) {
    uncommentPost(postId: $postId, commentId: $commentId) {
        _id
        comments {
            body
            createdAt
            user {
                _id
                email
                username
            }
            _id
        }
    }
}
`

export { LOGIN_USER, REGISTER_USER, CREATE_POST, LIKE_POST, DELETE_POST, UNCOMMENT_POST, COMMENT_POST };