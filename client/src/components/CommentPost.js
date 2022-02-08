import React from 'react';
import { useMutation } from '@apollo/client';

import { COMMENT_POST } from '../graphql/mutations';
import { Form, Message } from 'semantic-ui-react';

const CommentPost = ({postId}) => {
    const [commentBody, setCommentBody] = React.useState('');

    const [commentPost, { error: serverError }] = useMutation(COMMENT_POST, {
        update() {
            setCommentBody('')
        },
        variables: { postId, body: commentBody }
    });

    const handleChange = (e, { value }) => {
        setCommentBody(value);
    }

    return (
        <React.Fragment>
            <h4>Post a comment</h4>
            <Form error={!!serverError}>
                <Form.TextArea
                    placeholder='Comment'
                    value={commentBody}
                    onChange={handleChange}
                />
                <Message error header='Error' content={serverError && serverError.message}/>
                <Form.Button
                    content='Comment'
                    labelPosition='left'
                    icon='edit'
                    primary
                    onClick={commentPost}
                    disabled={commentBody.trim() === ''}
                />
            </Form>
        </React.Fragment>
    );
};

export default CommentPost;
