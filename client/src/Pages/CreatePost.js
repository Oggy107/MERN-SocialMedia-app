import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Message, TextArea } from 'semantic-ui-react';

import { CREATE_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';

const CreatePost = () => {
    const [state, setState] = React.useState({body: ''});
    const initialClientErrorState = {bodyError: ''};
    const [clientErrorState, setClientErrorState] = React.useState(initialClientErrorState);

    const [createPost, { loading, error: serverError }] = useMutation(CREATE_POST, {
        update: (cache, { data }) => {
            const { getPosts } = cache.readQuery({ query: GET_POSTS });
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: getPosts.concat([data.createPost])
                }
            });
        },
        variables: state,
    });

    const validate = () => {
        let valid = true;

        if (!state.body)
        {
            setClientErrorState({...clientErrorState, bodyError: 'Body is required'});
            valid = false;
        }
        else
            setClientErrorState(initialClientErrorState);

        return valid;
    }

    const handleChange = (e, { value }) => {
        setState({body: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        createPost();
    }

    return (
        <div className="form-container">
            <h1>Create a post</h1>
            <Form onSubmit={handleSubmit} error={!!(serverError || clientErrorState.bodyError)}>
                <TextArea
                    placeholder="anything..."
                    name="body"
                    onChange={handleChange}
                    style={{marginBottom: "1rem"}}
                />
                <Message error header="Error"list={[clientErrorState.bodyError, serverError && serverError.message]}/>
                <Form.Button 
                    type="submit"
                    content="submit"
                    loading={loading}
                    primary
                />
            </Form>
        </div>
    );
};

export default CreatePost;