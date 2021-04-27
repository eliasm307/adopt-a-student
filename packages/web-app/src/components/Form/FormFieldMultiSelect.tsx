import React, { Dispatch, SetStateAction } from "react";
import Form from "react-bootstrap/Form";
import MultiSelect from "react-multi-select-component";

import { MultiSelectOption } from "../../declarations/interfaces";

interface Props {
  description?: string;
  label: string;
  onChange: Dispatch<SetStateAction<any[]>>;
  options: MultiSelectOption[];
  value: MultiSelectOption[];
}

const FormFieldMultiSelect = ({
  onChange,
  options,
  value,
  label,
  description,
}: Props) => {
  return (
    <Form.Group style={{ width: "100%" }}>
      <Form.Label>{label}</Form.Label>
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy='selectLocalesLabel'
        className='w-100x'
      />
      {description && (
        <Form.Text className='text-muted'>{description}</Form.Text>
      )}
    </Form.Group>
  );
};

export default FormFieldMultiSelect;
