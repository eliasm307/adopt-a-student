import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  controlId: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const FormFieldPassword = ({ onChange, controlId }: Props) => {
  return (
    <Form.Group controlId={controlId} className='w-100'>
      <Form.Label>Password</Form.Label>
      <Form.Control
        required
        name={controlId}
        type='password'
        placeholder='Password'
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormFieldPassword;
