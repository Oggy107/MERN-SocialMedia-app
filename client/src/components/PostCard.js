import React from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import LikeButton from './LikeButton';

const PostCard = ({post: { _id, body, createdAt, user, comments, likes }}) => {
    const { state: userState } = React.useContext(UserContext);
    const navigate = useNavigate();

    const isMyPost = () => {
        return userState.user._id === user._id;
    }

    const handleCardClick = () => {
        navigate('/home/posts/' + _id);
    }

    const handleCommentPost = (e) => {
        e.stopPropagation();
        console.log('comment');
    }

    const handleDeletePost = (e) => {
        e.stopPropagation();
        console.log('delete');
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
                    <LikeButton likes={likes} userState={userState} postId={_id} navigate={navigate}/>
                    <Button as='div' labelPosition='right'>
                        <Button basic color='blue' onClick={handleCommentPost}>
                            <Icon name='comments' size='large'/>
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {comments.length}
                        </Label>
                    </Button>
                    {
                        userState.user && isMyPost() && (
                            <Button basic onClick={handleDeletePost} negative floated='right'>
                                <Icon name='trash alternate' size='large' style={{margin: "0"}}/>
                            </Button>
                        )
                    }
            </Card.Content>
        </Card>
    );
};

export default PostCard;
