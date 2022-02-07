import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Loader, Message, Image, Card, CardContent } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { GET_POST } from '../graphql/queries';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import { UserContext } from '../context/user';
import DeleteButton from '../components/DeleteButton';

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
            <div className="ui form-container">
                <Message error>{error.message}</Message>
            </div>
        )
    }

    const { body, createdAt, comments, likes, user } = data.getPost;

    const isMyPost = () => {
        return userState.user._id === user._id;
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        floated='right'
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                </Grid.Column>
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
            </Grid.Row>
        </Grid>
    );
};

export default SinglePost;
