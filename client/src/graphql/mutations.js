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

export { LOGIN_USER, REGISTER_USER };