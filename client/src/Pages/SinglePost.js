import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Loader, Image, Card, CardContent, GridColumn } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { UserContext } from '../context/user';

import { GET_POST } from '../graphql/queries';

import LikeButton from '../components/btns/LikeButton';
import CommentButton from '../components/btns/CommentButton';
import DeleteButton from '../components/btns/DeleteButton';

import CommentPost from '../components/CommentPost';

import ErrorMessage from '../components/ErrorMessage';

const SinglePost = (props) => {
    const postId = window.location.pathname.split('/')[3];
    const navigate = useNavigate();
    const {state: userState} = React.useContext(UserContext);

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            postId
        },
    });

    if (loading) return <Loader active />;

    if (error)
    {
        return (
            <ErrorMessage content={error.message}/>
        )
    }

    if (!data.getPost)
    {
        return (
            <ErrorMessage content={`No post found with id ${postId}`}/>
        )
    }

    const { body, createdAt, comments, likes, user } = data.getPost;

    const isMyPost = () => {
        return userState.user._id === user._id;
    }

    const isMyComment = (comment) => {
        return userState.user._id === comment.user._id;
    }

    return (
        <Grid stackable>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        centered
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                </Grid.Column>
                <GridColumn width={14}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                            <Card.Meta>{moment.unix(createdAt / 1000).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <CardContent extra>
                            <LikeButton likes={likes} postId={postId} userState={userState}/>
                            <CommentButton comments={comments}/>
                            { userState.user && isMyPost() && <DeleteButton postId={postId} callback={() => {navigate('/home')}}/>}
                        </CardContent>
                    </Card>
                    { userState.user && <CommentPost postId={postId} /> }
                    {
                        comments.map(comment => (
                            <Card fluid key={comment._id}>
                                <Card.Content>
                                    { userState.user && isMyComment(comment) && <DeleteButton postId={postId} commentId={comment._id}/> }
                                    <Card.Header>{comment.user.username}</Card.Header>
                                    <Card.Meta>{moment.unix(comment.createdAt / 1000).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
};

export default SinglePost;
