import { gql } from '@apollo/client';

const GET_USER = gql`
query getUser($token: String!) {
    getUser(token: $token) {
        _id
        email
        username
    }
}
`

const GET_POSTS = gql`
query getPosts {
    getPosts {
        _id
        body
        comments {
            _id
            body
            createdAt
                user {
                    _id
                    email
                    username
                }
        }
        likes {
            createdAt
                user {
                    _id
                    email
                    username
                }
        }
        user {
            _id
            email
            username
        }
    createdAt
    }
}
`

export { GET_USER, GET_POSTS };