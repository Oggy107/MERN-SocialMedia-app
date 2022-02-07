import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

const CommentButton = ({ comments }) => {
    const handleCommentPost = (e) => {
        e.stopPropagation();
        console.log('comment');
    }

    return (
        <Button as='div' labelPosition='right'>
            <Button basic color='blue' onClick={handleCommentPost}>
                <Icon name='comments' size='large'/>
            </Button>
            <Label basic color='blue' pointing='left'>
                {comments.length}
            </Label>
        </Button>
    );
};

export default CommentButton;
