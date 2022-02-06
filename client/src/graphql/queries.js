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

export { GET_USER };