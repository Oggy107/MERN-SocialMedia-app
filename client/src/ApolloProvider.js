import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://192.168.107.164:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


const ApolloProviderCustom = (props) => {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}

export { ApolloProviderCustom as default, client };