import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000',
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