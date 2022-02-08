import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { CREATE_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';
import { UserContext } from '../context/user';

import ErrorMessage from '../components/ErrorMessage';

const CreatePost = () => {
    const {state: userState} = React.useContext(UserContext);
    const navigate = useNavigate();
    const [postBody, setPostBody] = React.useState('');

    const [createPost, { loading, error: serverError }] = useMutation(CREATE_POST, {
        update: (cache, { data }) => {
            const { getPosts: posts } = cache.readQuery({ query: GET_POSTS });
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: posts.concat([data.createPost])
                }
            });
        },
        onError: (error) => {
            error.networkError && error.networkError.result.errors.forEach(err => {
                console.error(err.extensions.code, err.message);
            });
        },
        variables: {body: postBody},
    });

    const handleChange = (e, { value }) => {
        setPostBody(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
    }

    React.useEffect(() => {
        if (!userState.user)
            navigate('/home');
    }, [userState.user])

    return (
        <div className="form-container">
            <h1>Create a post</h1>
            <Form onSubmit={handleSubmit} error={!!serverError}>
                <Form.TextArea
                    placeholder="anything..."
                    name="body"
                    onChange={handleChange}
                />
                <ErrorMessage />
                <Form.Button
                    type="submit"
                    content="submit"
                    loading={loading}
                    primary
                    disabled={postBody.trim() === ''}
                />
            </Form>
        </div>
    );
};

export default CreatePost;