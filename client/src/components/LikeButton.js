import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { LIKE_POST } from '../graphql/mutations';

const LikeButton = ({ likes, userState, postId }) => {
    const navigate = useNavigate();

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId }
    })

    const isLiked = () => {
        let liked = false;
        if (likes.length > 0) {
            likes.forEach(like => {
                if (like.user._id === userState.user._id) {
                    liked = true;
                }
            })
        }

        return liked;
    }

    const handleLikePost = (e) => {
        e.stopPropagation();

        if (!userState.user)
            navigate('/login');
        else
            likePost();
    }

    return (
        <Button as='div' labelPosition='right'>
            <Button basic={userState.user ? !isLiked() : true} color='teal' onClick={handleLikePost} >
                <Icon name='heart' size='large' />
            </Button>
            <Label basic color='teal' pointing='left'>
                {likes.length}
            </Label>
        </Button>
  );
};

export default LikeButton;
