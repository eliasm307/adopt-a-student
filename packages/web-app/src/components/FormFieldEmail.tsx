import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  controlId: string;
  onChangeHandler?: () => React.ChangeEventHandler<HTMLFormElement>;
}

const FormFieldEmail = ({ onChangeHandler, controlId }: Props) => {
  return (
    <Form.Group controlId={controlId} className='w-100'>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type='email'
        placeholder='Enter email'
        onChange={onChangeHandler}
      />
      <Form.Text className='text-muted'>
        We&apos;ll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
};

export default FormFieldEmail;
