import React from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { DELETE_POST, UNCOMMENT_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';

const DeleteButton = ({ postId, commentId, callback }) => {
    const [open, setOpen] = React.useState(false);

    const MUTATION = commentId ? UNCOMMENT_POST : DELETE_POST;

    const [deleteData] = useMutation(MUTATION, {
        update(cache) {
            const { getPosts: posts } = cache.readQuery({ query: GET_POSTS});

            if (!commentId)
            {
                cache.writeQuery({
                    query: GET_POSTS,
                    data: {
                        getPosts: posts.filter(post => post._id !== postId)
                    }
                })
            }
            setOpen(false);
            callback && callback();
        },
        variables: { postId, commentId }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(true);
    }

    const handleCancel = (e) => {
        e.stopPropagation();
        setOpen(false);
    }

    const handleConfirm = (e) => {
        e.stopPropagation();
        deleteData();
    }

    return (
        <React.Fragment>
            <Button basic onClick={handleClick} negative floated='right'>
                <Icon name='trash alternate' size='large' style={{margin: "0"}}/>
            </Button>
            <Confirm 
                open={open}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                header={commentId ? 'Delete Comment' : 'Delete Post'}
                content={`Are you sure you want to delete this ${commentId ? 'comment' : 'post'}?`}
            />
        </React.Fragment>
    )
};

export default DeleteButton;
