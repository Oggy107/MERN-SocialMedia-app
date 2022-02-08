import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = ({content}) => {
    return (
        <Message error header="Error" content={content || 'Something went wrong. Please try again later'} />
    )
};

export default ErrorMessage;