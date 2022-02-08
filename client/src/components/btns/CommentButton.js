import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

const CommentButton = ({ comments }) => {
    return (
        <Button as='div' labelPosition='right'>
            <Button basic color='blue'>
                <Icon name='comments' size='large'/>
            </Button>
            <Label basic color='blue' pointing='left'>
                {comments.length}
            </Label>
        </Button>
    );
};

export default CommentButton;
