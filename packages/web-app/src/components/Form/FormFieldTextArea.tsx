import React, { ForwardedRef } from "react";
import Form from "react-bootstrap/Form";

interface Props {
  controlId: string;
  defaultValue?: string;
  description?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const FormFieldTextArea = React.forwardRef(
  (
    {
      onChange,
      controlId,
      label,
      required,
      description: description,
      defaultValue = "",
    }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
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
          ref={ref}
        />
        {description && (
          <Form.Text className='text-muted'>{description}</Form.Text>
        )}
      </Form.Group>
    );
  }
);

// todo add react memo where reasonable
export default React.memo(FormFieldTextArea);
