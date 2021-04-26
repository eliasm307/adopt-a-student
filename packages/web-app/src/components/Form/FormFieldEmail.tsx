import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  controlId: string;
  defaultValue: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const FormFieldEmail = ({
  onChange,
  controlId,
  defaultValue,
  required,
}: Props) => {
  return (
    <Form.Group controlId={controlId} className='w-100'>
      <Form.Label>Email</Form.Label>
      <Form.Control
        required={required}
        type='email'
        name={controlId}
        placeholder='Enter email'
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <Form.Text className='text-muted'>
        We&apos;ll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
};

export default FormFieldEmail;
