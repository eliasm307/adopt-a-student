import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  controlId: string;
  defaultValue?: string;
  fieldDescription?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const FormFieldTextArea = ({
  onChange,
  controlId,
  label,
  required,
  fieldDescription: description,
  defaultValue = "",
}: Props) => {
  return (
    <Form.Group controlId={controlId} className='w-100'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required={required}
        as='textarea'
        rows={3}
        name={controlId}
        placeholder=''
        onChange={onChange}
        defaultValue={defaultValue}
        style={{ resize: "none" }}
      />
      {description && (
        <Form.Text className='text-muted'>{description}</Form.Text>
      )}
    </Form.Group>
  );
};

// todo add react memo where reasonable
export default React.memo(FormFieldTextArea);
