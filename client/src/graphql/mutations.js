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
    }
}
`

export { LOGIN_USER, REGISTER_USER, CREATE_POST };