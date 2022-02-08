import React from 'react';
import { Form } from 'semantic-ui-react';

import ErrorMessage from './ErrorMessage';

const MyForm = ({onSubmit, onChange, error, errorContent, buttonContent, buttonLoading, ...fields}) => {
    return (
        <Form onSubmit={onSubmit} error={error}>
            {
                Object.keys(fields).map(field => (
                    <Form.Input
                        key={field}
                        label={field[0].toUpperCase() + field.slice(1)}
                        type='text'
                        name={field}
                        {...fields[field]}
                        onChange={onChange}
                    />
                ))
            }
            <ErrorMessage content={errorContent && errorContent} />
            <Form.Button 
                type="submit"
                content={buttonContent || "Submit"} 
                loading={buttonLoading || false}
                primary
            />
        </Form>
    );
};

export default MyForm;
