import React from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';

const PostCard = ({post: { _id, body, createdAt, user, comments, likes }}) => {
    const { state: userState } = React.useContext(UserContext);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/home/posts/' + _id);
    }

    const isMyPost = () => {
        return userState.user._id === user._id;
    }

    return (
        <Card fluid onClick={handleCardClick}>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{user.username}</Card.Header>
                <Card.Meta>{moment.unix(createdAt / 1000).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                    <LikeButton likes={likes} userState={userState} postId={_id} />
                    <CommentButton comments={comments}/>
                    { userState.user && isMyPost() && <DeleteButton /> }
            </Card.Content>
        </Card>
    );
};

export default PostCard;
