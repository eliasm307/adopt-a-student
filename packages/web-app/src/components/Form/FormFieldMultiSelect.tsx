import React, { Dispatch, SetStateAction } from 'react';
import Form from 'react-bootstrap/Form';
import MultiSelect from 'react-multi-select-component';

import { MultiSelectOption } from '../../declarations/interfaces';

interface Props {
  label: string;
  onChange: Dispatch<SetStateAction<never[]>>;
  options: MultiSelectOption[];
  value: MultiSelectOption[];
}

const FormFieldMultiSelect = ({ onChange, options, value, label }: Props) => {
  return (
    <Form.Group className='w-100x'>
      <Form.Label>{label}</Form.Label>
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy='selectLocalesLabel'
        className='w-100x'
      />
    </Form.Group>
  );
};

export default FormFieldMultiSelect;
