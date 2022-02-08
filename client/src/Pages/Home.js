import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Loader } from 'semantic-ui-react'

import PostCard from '../components/PostCard';
import { GET_POSTS } from '../graphql/queries';

import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading)
        return <Loader active />

    if (error)
        return <ErrorMessage />

    return (
        <React.Fragment>
            <div className="title">
                <h1>Recent Posts</h1>
            </div>
            <Grid stackable columns={3}>
                <Grid.Row>
                    {
                        data.getPosts.map(post => (
                            <Grid.Column key={post._id} style={{margin: '1rem 0'}}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    }
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
};

export default Home;
