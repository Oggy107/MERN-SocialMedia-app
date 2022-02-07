import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const DeleteButton = () => {
    const handleDeletePost = (e) => {
        e.stopPropagation();
        console.log('delete');
    }

    return (
        <Button basic onClick={handleDeletePost} negative floated='right'>
            <Icon name='trash alternate' size='large' style={{margin: "0"}}/>
        </Button>
    )
};

export default DeleteButton;
