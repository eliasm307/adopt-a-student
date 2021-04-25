import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  controlId: string;
  fieldDescription?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const FormFieldText = ({
  onChange,
  controlId,
  label,
  required,
  fieldDescription: description,
}: Props) => {
  return (
    <Form.Group controlId={controlId} className='w-100'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required={required}
        type='text'
        name={controlId}
        placeholder=''
        onChange={onChange}
      />
      {description && (
        <Form.Text className='text-muted'>{description}</Form.Text>
      )}
    </Form.Group>
  );
};

// todo add react memo where reasonable
export default React.memo(FormFieldText);
